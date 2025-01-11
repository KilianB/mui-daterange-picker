import { addMonths, addYears, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, max, min } from "date-fns";
import * as React from "react";
import { getDefaultRanges } from "../defaults";
import { DateRange, DefinedRange, NavigationAction } from "../types";
import { getValidatedMonths, parseOptionalDate } from "../utils";
import { DefinedRangesProps } from "./DefinedRanges";
import { MARKERS, Marker } from "./Markers";
import Menu, { MenuProps } from "./Menu";
import { ClickAwayListener, ClickAwayListenerProps, Popper, PopperProps } from "@mui/material";

interface ConditionalClickAwayListenerProps extends ClickAwayListenerProps {
  enabled: boolean;
}

const ConditionalClickAwayListener: React.FC<ConditionalClickAwayListenerProps> = ({
  children,
  enabled,
  ...clickAWayOriginalProps
}) => {
  if (enabled) {
    return <ClickAwayListener {...clickAWayOriginalProps}>{children}</ClickAwayListener>;
  } else {
    return <>{children}</>;
  }
};

ConditionalClickAwayListener.displayName = "ConditionalClickAwayListener";

// {
//   children,
//   enabled,
//
// }

export interface DateRangePickerProps {
  open: boolean;

  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  // eslint-disable-next-line no-unused-vars
  onChange: (dateRange: DateRange) => void;
  locale?: Locale;
  DefinedRangesProps?: Pick<DefinedRangesProps, "className" | "classes" | "allowCustomRangeLabel" | "customRangeLabel">;
  MenuProps?: Pick<
    MenuProps,
    | "classes"
    | "renderValue"
    | "hideRangeArrow"
    | "hideHeaderDivider"
    | "hideMonthDivider"
    | "hideCloseButton"
    | "renderHeader"
  >;
  MonthProps?: MenuProps["MonthProps"];
  MonthHeaderProps?: MenuProps["MonthHeaderProps"];
  MonthDayProps?: MenuProps["MonthDayProps"];
  CloseButtonProps?: MenuProps["closeButtonProps"];
  anchorRef: React.RefObject<HTMLElement | null>;
  closeOnClickOutside?: boolean;
  popperModifiers: PopperProps["modifiers"];
}

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const today = new Date();

  const {
    open,
    onChange,
    initialDateRange,
    minDate,
    maxDate,
    definedRanges = getDefaultRanges(new Date(), props.locale),
    locale,
    DefinedRangesProps,
    closeOnClickOutside,
    MenuProps,
    MonthProps,
    MonthHeaderProps,
    MonthDayProps,
    CloseButtonProps,
    anchorRef,
    popperModifiers,
    toggle,
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(initialDateRange || {}, minDateValid, maxDateValid);

  const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(intialFirstMonth || today);
  const [secondMonth, setSecondMonth] = React.useState<Date>(initialSecondMonth || addMonths(firstMonth, 1));

  const { startDate, endDate } = dateRange;

  // handlers
  const setFirstMonthValidated = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range: DateRange) => {
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = max([newStart, minDateValid]);
      range.endDate = newEnd = min([newEnd, maxDateValid]);

      setDateRange(range);
      onChange(range);

      setFirstMonth(newStart);
      setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
    } else {
      const emptyRange = {};

      setDateRange(emptyRange);
      onChange(emptyRange);

      setFirstMonth(today);
      setSecondMonth(addMonths(firstMonth, 1));
    }
  };

  const onDayClick = (day: Date) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onChange(newRange);
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.BOTH_MONTHS) {
      const firstNew = addMonths(firstMonth, action);
      const secondNew = addMonths(secondMonth, action);
      setFirstMonth(firstNew);
      setSecondMonth(secondNew);
    }

    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day: Date) =>
    (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, { start: startDate, end: hoverDay })) as boolean;

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    toggle();
  };

  return (
    <Popper open={open} anchorEl={anchorRef && anchorRef.current} sx={{ zIndex: 1 }} modifiers={popperModifiers}>
      <ConditionalClickAwayListener enabled={closeOnClickOutside !== false} onClickAway={handleClose}>
        <Menu
          dateRange={dateRange}
          minDate={minDateValid}
          maxDate={maxDateValid}
          ranges={definedRanges}
          firstMonth={firstMonth}
          secondMonth={secondMonth}
          setFirstMonth={setFirstMonthValidated}
          setSecondMonth={setSecondMonthValidated}
          setDateRange={setDateRangeValidated}
          helpers={helpers}
          handlers={handlers}
          locale={locale}
          DefinedRangesProps={DefinedRangesProps}
          MonthProps={MonthProps}
          MonthHeaderProps={MonthHeaderProps}
          MonthDayProps={MonthDayProps}
          toggle={toggle}
          closeButtonProps={CloseButtonProps}
          {...MenuProps}
        />
      </ConditionalClickAwayListener>
    </Popper>
  );
};

export default DateRangePicker;

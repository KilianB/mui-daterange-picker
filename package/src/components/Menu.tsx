import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Box, Button, Divider, Grid, Paper, Typography, ButtonProps, IconButton } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import React, { CSSProperties, ReactNode } from "react";
import { DateRange, DefinedRange, NavigationAction, Setter } from "../types";
import DefinedRanges, { DefinedRangesProps } from "./DefinedRanges";
import { MARKERS } from "./Markers";
import Month, { MonthProps } from "./Month";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface CustomComponentRenderer {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
}
export interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  DefinedRangesProps?: Pick<
    DefinedRangesProps,
    "className" | "classes" | "allowCustomRangeLabel" | "customRangeLabel" | "customComponentRenderer"
  >;
  className?: string;
  classes?: {
    rangesMenuDivider?: string;
    valueContainer?: string;
    valueItem?: string;
  };
  // eslint-disable-next-line no-unused-vars
  renderValue?: (valueType: "start" | "end", _?: Date, locale?: Locale) => ReactNode;
  renderHeader?: (args: CustomComponentRenderer) => ReactNode;
  hideRangeArrow?: boolean;
  hideHeaderDivider?: boolean;
  hideMonthDivider?: boolean;
  MonthProps?: Pick<MonthProps, "weekdaysDisplayLocale" | "weekStartOn" | "classes" | "containerSx">;
  MonthHeaderProps?: MonthProps["MonthHeaderProps"];
  MonthDayProps?: MonthProps["DayProps"];
  hideCloseButton?: boolean;
  singleMonth?: boolean;
  closeButtonProps?: {
    label?: string;
    hideDivider?: boolean;
    classes?: {
      wrapper?: string;
    };
    buttonProps?: ButtonProps;
  };

  nextButtonProps?: {
    style?: CSSProperties;
  };
  prevButtonProps?: {
    style?: CSSProperties;
  };
  toggle: () => void;
}

const Menu: React.FunctionComponent<MenuProps> = React.forwardRef<any, MenuProps>((props, ref) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    singleMonth,
    handlers,
    locale,
    DefinedRangesProps,
    renderValue,
    hideRangeArrow,
    hideHeaderDivider,
    hideMonthDivider,
    MonthProps,
    MonthHeaderProps,
    MonthDayProps,
    className,
    hideCloseButton,
    renderHeader,
    nextButtonProps,
    prevButtonProps,
    toggle,
    classes = {
      rangesMenuDivider: "",
      valueContainer: "",
      valueItem: "",
    },
    closeButtonProps,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
    MonthHeaderProps,
    DayProps: MonthDayProps,
    ...MonthProps,
  };

  return (
    <Paper elevation={5} square className={className} ref={ref}>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} {...DefinedRangesProps} />
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.rangesMenuDivider} />
        <Grid>
          <Grid
            container
            className={classes.valueContainer}
            sx={{ padding: singleMonth ? "20px" : "20px 70px" }}
            alignItems="center"
          >
            {renderHeader ? (
              <Grid item className={classes.valueItem} sx={{ flex: 1 }}>
                {renderHeader({
                  selectedRange: dateRange,
                  ranges: ranges,
                  setRange: setDateRange,
                })}
              </Grid>
            ) : (
              <>
                <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: "center" }}>
                  {renderValue ? (
                    renderValue("start", startDate, locale)
                  ) : (
                    <Typography variant="subtitle1">
                      {startDate ? format(startDate, "dd MMMM yyyy", { locale }) : "Start Date"}
                    </Typography>
                  )}
                </Grid>
                {!hideRangeArrow && (
                  <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: "center" }}>
                    <ArrowRightAlt color="action" />
                  </Grid>
                )}
                <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: "center" }}>
                  {renderValue ? (
                    renderValue("end", endDate, locale)
                  ) : (
                    <Typography variant="subtitle1">
                      {endDate ? format(endDate, "dd MMMM yyyy", { locale }) : "End Date"}
                    </Typography>
                  )}
                </Grid>
              </>
            )}
          </Grid>
          {!hideHeaderDivider && <Divider />}
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            {!hideMonthDivider && <Divider orientation="vertical" flexItem />}
            {!singleMonth && (
              <Month
                {...commonProps}
                value={secondMonth}
                setValue={setSecondMonth}
                navState={[canNavigateCloser, true]}
                marker={MARKERS.SECOND_MONTH}
                locale={locale}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {hideCloseButton !== true && (
        <>
          {closeButtonProps?.hideDivider !== true && <Divider></Divider>}
          <Box display={"flex"} className={closeButtonProps?.classes?.wrapper} justifyContent={"end"}>
            <Button
              sx={{
                marginY: "0.5em",
              }}
              onClick={toggle}
              {...closeButtonProps?.buttonProps}
            >
              {closeButtonProps?.label ?? "Done"}
            </Button>
          </Box>
        </>
      )}
      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          left: "0px",
          top: "50%",
          transform: "translateX(-50%)",
          display:
            firstMonth.getMonth() > minDate.getMonth() || firstMonth.getFullYear() > minDate.getFullYear()
              ? "inherit"
              : "none",
          ...prevButtonProps?.style,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "#f7f8f8",
            },
            boxShadow: 2,
          }}
          onClick={() => handlers.onMonthNavigate(MARKERS.BOTH_MONTHS, NavigationAction.Previous)}
        >
          <NavigateBeforeIcon color="primary" />
        </IconButton>
      </Box>

      <Box
        sx={{
          zIndex: 10,
          position: "absolute",
          right: "0px",
          top: "50%",
          transform: "translateX(+50%)",
          display:
            secondMonth.getMonth() < maxDate.getMonth() || secondMonth.getFullYear() < maxDate.getFullYear()
              ? "inherit"
              : "none",
          ...nextButtonProps?.style,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "#f7f8f8",
            },
            boxShadow: 2,
          }}
          onClick={() => handlers.onMonthNavigate(MARKERS.BOTH_MONTHS, NavigationAction.Next)}
        >
          <NavigateNextIcon color="primary" />
        </IconButton>
      </Box>
    </Paper>
  );
});

Menu.displayName = "Menu";

export default Menu;

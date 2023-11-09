/* eslint-disable object-curly-newline */
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import { Divider, Grid, Paper, SelectProps, Typography } from '@mui/material';
import { differenceInCalendarMonths, format } from 'date-fns';
import React, { ReactNode } from 'react';
import {
  DateRange,
  DefinedRange,
  FixedLengthArray,
  NavigationAction,
  Setter,
} from '../types';
import DefinedRanges from './DefinedRanges';
import { MARKERS } from './Markers';
import Month from './Month';

interface MenuProps {
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
  DefinedRangesProps?: {
    classes?: {
      listItem?: string;
      listItemActive?: string;
      listItemTextTypography?: string;
    },
    allowCustomRangeLabel?: boolean;
    customRangeLabel?: string;
  }
  className?: string;
  classes?: {
    rangesMenuDivider?: string;
    valueContainer?: string;
    valueItem?: string;
  };
  // eslint-disable-next-line no-unused-vars
  renderValue?: (valueType: "start" | "end", _?: Date, locale?: Locale) => ReactNode;
  hideRangeArrow?: boolean;
  hideHeaderDivider?: boolean;
  hideMonthDivider?: boolean;
  MonthProps?: {
    weekdaysDisplayLocale?: Locale;
    weekStartOn?: Required<Required<Locale>["options"]>["weekStartsOn"];
    classes?: {
      dayInMonthGrid?: string;
      weekday?: string;
      weekend?: string;
    };
  };
  MonthHeaderProps?: {
    customMonthLabels?: FixedLengthArray<string, 12>;
    classes?: {
      root?: string;
      navWrap?: string;
      nav?: string;
    };
    // eslint-disable-next-line no-unused-vars
    renderPrevIcon?: (disabled?: boolean) => ReactNode;
    // eslint-disable-next-line no-unused-vars
    renderNextIcon?: (disabled?: boolean) => ReactNode;
    selectProps?: SelectProps<number>;
  };
  MonthDayProps?: {
    classes?: {
      root?: string;
      highlighted?: string;
      btnFilled?: string;
      text?: string;
      weekendText?: string;
      filledText?: string;
    };
    borderRadius?: string;
    height?: any;
  }
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
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
    classes = {
      rangesMenuDivider: '',
      valueContainer: '',
      valueItem: ''
    }
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
    MonthProps,
    MonthHeaderProps,
    DayProps: MonthDayProps
  };
  return (
    <Paper elevation={5} square className={className}>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
            {...DefinedRangesProps}
          />
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.rangesMenuDivider} />
        <Grid>
          <Grid container className={classes.valueContainer} sx={{ padding: '20px 70px' }} alignItems="center">
            <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: 'center' }}>
              {renderValue
                ? renderValue("start", startDate, locale)
                : <Typography variant="subtitle1">
                  {startDate ? format(startDate, 'dd MMMM yyyy', { locale }) : 'Start Date'}
                </Typography>}

            </Grid>
            {!hideRangeArrow && <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: 'center' }}>
              <ArrowRightAlt color="action" />
            </Grid>}
            <Grid item className={classes.valueItem} sx={{ flex: 1, textAlign: 'center' }}>
              {renderValue
                ? renderValue("end", endDate, locale)
                : <Typography variant="subtitle1">
                  {endDate ? format(endDate, 'dd MMMM yyyy', { locale }) : 'End Date'}
                </Typography>}
            </Grid>
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
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;

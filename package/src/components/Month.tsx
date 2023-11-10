import { Grid, Paper, SelectProps, Typography } from "@mui/material";
import {
  format,
  getDate, isSameMonth, isToday,
  isWithinInterval
} from "date-fns";
import React, { ReactNode } from "react";
import {
  chunks, getDaysInMonth,
  inDateRange,
  isEndOfRange,
  isRangeSameDay,
  isStartOfRange
} from "../utils";
import Day from "./Day";
import Header from "./Header";

import { DateRange, NavigationAction } from "../types";


interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  // eslint-disable-next-line no-unused-vars
  setValue: (date: Date) => void;
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
  MonthHeaderProps?: {
    customMonthLabels?: string[];
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
  classes?: {
    dayInMonthGrid?: string;
    weekday?: string;
    weekend?: string;
  };
  weekdaysDisplayLocale?: Locale;
  weekStartOn?: Required<Required<Locale>["options"]>["weekStartsOn"]
  DayProps?: {
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

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    locale,
    weekdaysDisplayLocale,
    weekStartOn: _weekStartOn,
    MonthHeaderProps,
    classes = {
      dayInMonthGrid: '',
      weekday: '',
      weekend: ''
    },
    DayProps
  } = props;

  const weekStartsOn = typeof _weekStartOn !== "undefined" ? _weekStartOn : (locale?.options?.weekStartsOn || 0);
  const WEEK_DAYS = typeof weekdaysDisplayLocale !== "undefined"
    ? [...Array(7).keys()].map(d => weekdaysDisplayLocale.localize?.day((d + weekStartsOn) % 7, { width: 'short', context: 'standalone' }))
    : (typeof locale !== 'undefined'
      ? [...Array(7).keys()].map(d => locale.localize?.day((d + weekStartsOn) % 7, { width: 'short', context: 'standalone' }))
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
  const [back, forward] = props.navState;

  return (
    <Paper square elevation={0} sx={{ width: 290 }}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
          onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
          locale={locale}
          {...MonthHeaderProps}
        />

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          sx={{
            marginTop: "10px",
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          {WEEK_DAYS.map((day, index) => {
            const isWeekend = index >= 5;
            return (
              <Typography
                className={`${classes.weekday}${isWeekend && classes.weekend ? ` ${classes.weekend}` : ''}`}
                color="textSecondary" key={index} variant="caption">
                {day}
              </Typography>
            )
          })}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          className={classes.dayInMonthGrid}
          sx={{
            paddingLeft: '15px',
            paddingRight: '15px',
            marginTop: '15px',
            marginBottom: '20px'
          }}
        >
          {chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justifyContent="center">
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);
                const dow = day.getDay();
                const isWeekend = dow == 6 || dow === 0;
                const filled = isStart || isEnd;
                const isDisabled = !isSameMonth(date, day)
                  || !isWithinInterval(day, { start: minDate, end: maxDate })

                return (
                  <Day
                    key={format(day, "dd-MM-yyyy")}
                    filled={filled}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={isDisabled}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                    isWeekend={isWeekend}
                    {...DayProps}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Month;

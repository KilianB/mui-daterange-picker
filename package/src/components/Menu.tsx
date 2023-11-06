/* eslint-disable object-curly-newline */
import React, { ReactNode } from 'react';
import { Divider, Grid, Paper, SelectProps, Theme, Typography } from '@mui/material';
import { differenceInCalendarMonths, format } from 'date-fns';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from '../types';
import { MARKERS } from './Markers';

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
    color?: {
      // eslint-disable-next-line no-unused-vars
      activeBg?: string | ((_: Theme) => string);
      activeText?: string;
      activeTextHover?: string;
    };
    fontWeight?: {
      active?: string;
      normal?: string;
    }
    allowCustomRangeLabel?: boolean;
    customRangeLabel?: string;
  }
  dividerColor?: string;
  // eslint-disable-next-line no-unused-vars
  renderValue?: (_?: Date, locale?: Locale) => ReactNode;
  hideRangeArrow?: boolean;
  hideHeaderDivider?: boolean;
  hideMonthDivider?: boolean;
  headerContainerPadding?: string;
  valueAlign?: any;
  MonthHeaderProps?: {
    containerJustifyContent?: string;
    containerGap?: any;
    navWrapPadding?: any;
    navPadding?: any;
    // eslint-disable-next-line no-unused-vars
    renderPrevIcon?: (disabled?: boolean) => ReactNode;
    // eslint-disable-next-line no-unused-vars
    renderNextIcon?: (disabled?: boolean) => ReactNode;
    selectProps?: SelectProps<number>;
  },
  MonthDayProps?: {
    color?: {
      // eslint-disable-next-line no-unused-vars
      filledBg?: string | ((theme: Theme) => string),
      filledText?: string;
      weekend?: string;
      normal?: string;
      disabled?: string;
    }
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
    dividerColor,
    renderValue,
    hideRangeArrow,
    hideHeaderDivider,
    hideMonthDivider,
    headerContainerPadding,
    valueAlign,
    MonthHeaderProps,
    MonthDayProps
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
    MonthHeaderProps,
    DayProps: MonthDayProps
  };
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
            {...DefinedRangesProps}
          />
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ borderColor: dividerColor }} />
        <Grid>
          <Grid container sx={{ padding: headerContainerPadding || '20px 70px' }} alignItems="center">
            <Grid item sx={{ flex: 1, textAlign: valueAlign || 'center' }}>
              {renderValue
                ? renderValue(startDate, locale)
                : <Typography variant="subtitle1">
                  {startDate ? format(startDate, 'dd MMMM yyyy', { locale }) : 'Start Date'}
                </Typography>}

            </Grid>
            {!hideRangeArrow && <Grid item sx={{ flex: 1, textAlign: valueAlign || 'center' }}>
              <ArrowRightAlt color="action" />
            </Grid>}
            <Grid item sx={{ flex: 1, textAlign: valueAlign || 'center' }}>
              {renderValue
                ? renderValue(endDate, locale)
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

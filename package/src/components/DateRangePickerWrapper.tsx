import React, { ReactNode } from 'react';

import { Box, SelectProps } from '@mui/material';
import DateRangePicker from './DateRangePicker';

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange, FixedLengthArray } from '../types';

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  // eslint-disable-next-line no-unused-vars
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
  locale?: Locale;
  DefinedRangesProps?: {
    className?: string;
    classes?: {
      listItem?: string;
      listItemActive?: string;
      listItemTextTypography?: string;
    },
    allowCustomRangeLabel?: boolean;
    customRangeLabel?: string;
  };
  MenuProps?: {
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
  };
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
  };
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => {
  const {
    closeOnClickOutside,
    wrapperClassName,
    toggle,
    open,
  } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  return (
    <Box sx={{ position: 'relative' }}>
      {
        open && (
          <Box
            sx={{
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              bottom: 0,
              zIndex: 0,
              right: 0,
              left: 0,
              top: 0,
            }}
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <Box sx={{ position: 'relative', zIndex: 1 }} className={wrapperClassName} >
        <DateRangePicker {...props} />
      </Box>
    </Box>
  );
};

export default DateRangePickerWrapper;

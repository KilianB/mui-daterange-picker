import React, { ReactNode } from 'react';

import { Box, SelectProps, Theme } from '@mui/material';
import DateRangePicker from './DateRangePicker';

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange } from '../types';

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
  };
  MenuProps?: {
    dividerColor?: string;
    // eslint-disable-next-line no-unused-vars
    renderValue?: (_?: Date, locale?: Locale) => ReactNode;
    hideRangeArrow?: boolean;
    hideHeaderDivider?: boolean;
    hideMonthDivider?: boolean;
    headerContainerPadding?: string,
    valueAlign?: any,
  }
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
  };
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

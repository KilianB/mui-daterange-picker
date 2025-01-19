import React from "react";

import { Box } from "@mui/material";
import DateRangePicker, { DateRangePickerProps } from "./DateRangePicker";

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange } from "../types";

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
  DefinedRangesProps?: DateRangePickerProps["DefinedRangesProps"];
  MenuProps?: DateRangePickerProps["MenuProps"];
  MonthProps?: DateRangePickerProps["MonthProps"];
  MonthHeaderProps?: DateRangePickerProps["MonthHeaderProps"];
  MonthDayProps?: DateRangePickerProps["MonthDayProps"];
  CloseButtonProps?: DateRangePickerProps["CloseButtonProps"];
  anchorRef: DateRangePickerProps["anchorRef"];
  popperModifiers: DateRangePickerProps["popperModifiers"];
  nextButtonProps?: DateRangePickerProps["nextButtonProps"];
  prevButtonProps?: DateRangePickerProps["prevButtonProps"];
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps
) => {
  const { wrapperClassName } = props;

  // const handleToggle = () => {
  //   if (closeOnClickOutside === false) {
  //     return;
  //   }

  //   toggle();
  // };

  // const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  return (
    <Box sx={{ position: "relative" }}>
      {/* {
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
              backgroundColor: 'rgba(30,30,30,0.5)'
            }}
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      } */}

      <Box sx={{ position: "relative", zIndex: 1 }} className={wrapperClassName}>
        <DateRangePicker {...props} />
      </Box>
    </Box>
  );
};

export default DateRangePickerWrapper;

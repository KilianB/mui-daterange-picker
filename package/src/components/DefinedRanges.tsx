import { List, ListItem, ListItemText, SxProps, Theme } from "@mui/material";
import { isSameDay } from "date-fns";
import React from "react";
import { DateRange, DefinedRange } from "../types";

interface CustomDefinedComponentRenderer {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
}

export type DefinedRangesProps = {
  // eslint-disable-next-line no-unused-vars
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
  className?: string;
  classes?: {
    listItem?: string;
    listItemActive?: string;
    listItemTextTypography?: string;
  };
  allowCustomRangeLabel?: boolean;
  customRangeLabel?: string;
  customComponentRenderer?: (args: CustomDefinedComponentRenderer) => React.ReactElement;
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges = ({
  ranges,
  setRange,
  selectedRange,
  className,
  classes = {
    listItem: "",
    listItemActive: "",
    listItemTextTypography: "",
  },
  allowCustomRangeLabel,
  customComponentRenderer,
  customRangeLabel = "",
}: DefinedRangesProps) => {
  if (customComponentRenderer) {
    return customComponentRenderer({
      ranges,
      selectedRange,
      setRange,
    });
  }

  return (
    <List className={className}>
      {ranges.map((range, idx) => {
        const _isSameRange = isSameRange(range, selectedRange);
        const sx: SxProps<Theme> = _isSameRange
          ? {
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: "primary.contrastText",
              "&:hover": {
                color: "inherit",
              },
            }
          : {};
        return (
          <ListItem
            component={"button"}
            key={idx}
            onClick={() => setRange(range)}
            className={`${classes.listItem}${
              _isSameRange && classes.listItemActive ? ` ${classes.listItemActive}` : ""
            }`}
            sx={sx}
          >
            <ListItemText
              primaryTypographyProps={{
                className: classes.listItemTextTypography,
                variant: "body2",
                sx: {
                  fontWeight: _isSameRange ? "bold" : "normal",
                },
              }}
            >
              {range.label}
            </ListItemText>
          </ListItem>
        );
      })}
      {allowCustomRangeLabel && (
        <>
          <ListItem
            component={"button"}
            onClick={(e) => {
              e.preventDefault();
            }}
            className={`${classes.listItem}${
              ranges.every((range) => !isSameRange(range, selectedRange)) && classes.listItemActive
                ? ` ${classes.listItemActive}`
                : ""
            }`}
            sx={{
              ...(ranges.every((range) => !isSameRange(range, selectedRange))
                ? {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: "primary.contrastText",
                    "&:hover": {
                      color: "inherit",
                    },
                  }
                : {}),
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                className: classes.listItemTextTypography,
                variant: "body2",
                sx: {
                  fontWeight: ranges.every((range) => !isSameRange(range, selectedRange)) ? "bold" : "normal",
                },
              }}
            >
              {customRangeLabel}
            </ListItemText>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default DefinedRanges;

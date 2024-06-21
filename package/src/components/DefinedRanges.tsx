import { List, ListItem, ListItemText, Theme } from '@mui/material';
import { SxProps } from "@mui/system";
import { isSameDay } from 'date-fns';
import React from 'react';
import { DateRange, DefinedRange } from '../types';

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
  },
  allowCustomRangeLabel?: boolean;
  customRangeLabel?: string;
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
  className,
  classes = {
    listItem: '',
    listItemActive: '',
    listItemTextTypography: ''
  },
  allowCustomRangeLabel,
  customRangeLabel = ''
}: DefinedRangesProps) => (
  <List className={className}>
    {ranges.map((range, idx) => {
      const _isSameRange = isSameRange(range, selectedRange);
      const sx: SxProps<Theme> = _isSameRange ? {
        backgroundColor: (theme) => theme.palette.primary.dark,
        color: 'primary.contrastText',
        '&:hover': {
          color: 'inherit'
        }
      } : {}
      return (
        <ListItem button
          key={idx}
          onClick={() => setRange(range)}
          className={`${classes.listItem}${_isSameRange && classes.listItemActive ? ` ${classes.listItemActive}` : ''}`}
          sx={sx}
        >
          <ListItemText
            primaryTypographyProps={{
              className: classes.listItemTextTypography,
              variant: 'body2',
              sx: {
                fontWeight: _isSameRange
                  ? 'bold'
                  : 'normal',
              },
            }}
          >
            {range.label}
          </ListItemText>
        </ListItem>
      )
    })}
    {allowCustomRangeLabel && <>
      <ListItem button
        onClick={(e) => { e.preventDefault(); }}
        className={`${classes.listItem}${ranges.every((range) => !isSameRange(range, selectedRange)) && classes.listItemActive ? ` ${classes.listItemActive}` : ''}`}
        sx={{
          ...(ranges.every((range) => !isSameRange(range, selectedRange)) ? {
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: 'primary.contrastText',
            '&:hover': {
              color: 'inherit'
            }
          } : {})
        }}
      >
        <ListItemText primaryTypographyProps={{
          className: classes.listItemTextTypography,
          variant: "body2",
          sx: {
            fontWeight: ranges.every((range) => !isSameRange(range, selectedRange))
              ? 'bold'
              : 'normal',
          }
        }}>
          {customRangeLabel}
        </ListItemText>
      </ListItem>
    </>}
  </List>
);

export default DefinedRanges;

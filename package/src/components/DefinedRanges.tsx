import React, { ReactNode } from 'react';
import { List, ListItem, ListItemText, Theme } from '@mui/material';
import { isSameDay } from 'date-fns';
import { DateRange, DefinedRange } from '../types';

type DefinedRangesProps = {
  // eslint-disable-next-line no-unused-vars
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
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
  color = {
    activeBg: (theme) => theme.palette.primary.dark,
    activeText: 'primary.contrastText',
    activeTextHover: 'inherit'
  },
  fontWeight = {
    active: 'bold',
    normal: 'normal'
  },
  allowCustomRangeLabel,
  customRangeLabel = ''
}: DefinedRangesProps) => (
  <List>
    {ranges.map((range, idx) => (
      <ListItem button
        key={idx}
        onClick={() => setRange(range)}
        sx={[
          isSameRange(range, selectedRange) && {
            backgroundColor: color.activeBg || ((theme) => theme.palette.primary.dark),
            color: color.activeText || 'primary.contrastText',
            '&:hover': {
              color: color.activeTextHover || 'inherit'
            }
          }]}
      >
        <ListItemText
          primaryTypographyProps={{
            variant: 'body2',
            sx: {
              fontWeight: isSameRange(range, selectedRange)
                ? (fontWeight.active || 'bold')
                : (fontWeight.normal || 'normal'),
            },
          }}
        >
          {range.label}
        </ListItemText>
      </ListItem>
    ))}
    {allowCustomRangeLabel && <>
      <ListItem button
        onClick={(e) => { e.preventDefault(); }}
        sx={[
          ranges.every((range) => !isSameRange(range, selectedRange)) && {
            backgroundColor: color.activeBg || ((theme) => theme.palette.primary.dark),
            color: color.activeText || 'primary.contrastText',
            '&:hover': {
              color: color.activeTextHover || 'inherit'
            }
          }
        ]}
      >
        <ListItemText primaryTypographyProps={{
          variant: "body2",
          sx: {
            fontWeight: ranges.every((range) => !isSameRange(range, selectedRange))
              ? (fontWeight.active || 'bold')
              : (fontWeight.normal || 'normal'),
          }
        }}>
          {customRangeLabel}
        </ListItemText>
      </ListItem>
    </>}
  </List>
);

export default DefinedRanges;

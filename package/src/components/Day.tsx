import React from 'react';
import { IconButton, Typography, Box, Theme } from '@mui/material';

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
  color?: {
    // eslint-disable-next-line no-unused-vars
    filledBg?: string | ((theme: Theme) => string),
    filledText?: string;
    // eslint-disable-next-line no-unused-vars
    highlightedBg?: string,
    primary?: string;
  }
  borderRadius?: string;
  height?: any;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
  color = {
    filledBg: (theme) => theme.palette.primary.dark,
  },
  borderRadius,
  height
}: DayProps) => {

  return (
    <Box
      sx={{
        display: 'flex',
        // eslint-disable-next-line no-nested-ternary
        borderRadius: startOfRange ? '50% 0 0 50%' : endOfRange ? '0 50% 50% 0' : undefined,
        backgroundColor: (theme) => !disabled && highlighted ? (color.highlightedBg || theme.palette.primary.light) : undefined,
      }}
    >
      <IconButton
        sx={{
          height: height || '36px',
          width: '36px',
          padding: 0,
          border: (theme) => !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined,
          ...(!disabled && filled ? {
            '&:hover': {
              backgroundColor: color.filledBg || ((theme) => theme.palette.primary.dark),
            },
            backgroundColor: color.filledBg || ((theme) => theme.palette.primary.dark),
          } : {}),
          borderRadius
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      // size="large"
      >
        <Typography
          sx={{
            lineHeight: 1.6,
            color: (theme) => color.primary || (!disabled
              ? (filled ? (color?.filledText || theme.palette.primary.contrastText) : theme.palette.text.primary)
              : theme.palette.text.secondary),
          }}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Day;

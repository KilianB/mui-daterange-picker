import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

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
  isWeekend?: boolean;
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
  isWeekend,
  classes = {
    root: '',
    highlighted: '',
    btnFilled: '',
    text: '',
    weekendText: '',
    filledText: ''
  },
  borderRadius,
  height
}: DayProps) => {

  return (
    <Box
      className={`${classes.root}${!disabled && highlighted && classes.highlighted ? ` ${classes.highlighted}` : ''}`}
      sx={{
        display: 'flex',
        // eslint-disable-next-line no-nested-ternary
        borderRadius: startOfRange ? '50% 0 0 50%' : endOfRange ? '0 50% 50% 0' : undefined,
        backgroundColor: (theme) => !disabled && highlighted ? theme.palette.primary.light : undefined,
      }}
    >
      <IconButton
        className={!disabled && filled && classes.btnFilled ? classes.btnFilled : undefined}
        sx={{
          height: height || '36px',
          width: '36px',
          padding: 0,
          border: (theme) => !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined,
          ...(!disabled && filled ? {
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
            backgroundColor: (theme) => theme.palette.primary.dark,
          } : {}),
          borderRadius
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      // size="large"
      >
        <Typography
          classes={`${classes.text}${!disabled && filled && classes.filledText ? ` ${classes.filledText}` : ''}${isWeekend && classes.weekendText ? ` ${classes.weekendText}` : ''}`}
          sx={{
            lineHeight: 1.6,
            color: (theme) => !disabled
              ? (filled ? theme.palette.primary.contrastText : theme.palette.text.primary)
              : theme.palette.text.secondary,
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

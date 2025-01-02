import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  date: Date;
  value: number | string;
  isWeekend?: boolean;
  classes?: {
    root?: string;
    outlined?: string;
    highlighted?: string;
    btnOutlined?: string;
    btnFilled?: string;
    text?: string;
    weekendText?: string;
    filledText?: string;
    startOfRange?: string;
    endOfRange?: string;
    btnStartOfRange?: string;
    btnEndOfRange?: string;
  };
  borderRadius?: string;
  renderDayCaption?: (args: {
    date: Date;
    filled: boolean;
    outlined: boolean;
    highlighted: boolean;
    disabled: boolean;
    startOfRange: boolean;
    endOfRange: boolean;
  }) => React.ReactElement;
  height?: any;
  width?: any;
  padding?: any;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  date,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
  isWeekend,
  classes = {
    root: "",
    highlighted: "",
    outlined: "",
    btnOutlined: "",
    btnFilled: "",
    text: "",
    weekendText: "",
    filledText: "",
    startOfRange: "",
    endOfRange: "",
    btnStartOfRange: "",
    btnEndOfRange: "",
  },
  renderDayCaption,
  borderRadius,
  height,
  width,
  padding,
}: DayProps) => {
  return (
    <Box
      className={`${classes.root}${!disabled && highlighted && classes.highlighted ? ` ${classes.highlighted}` : ""}${
        outlined ? ` ${classes.outlined}` : ""
      }${startOfRange ? ` ${classes.startOfRange}` : ""}${endOfRange ? ` ${classes.endOfRange}` : ""}`}
      sx={{
        display: "flex",
        // eslint-disable-next-line no-nested-ternary
        borderRadius: startOfRange ? "50% 0 0 50%" : endOfRange ? "0 50% 50% 0" : undefined,
        backgroundColor: (theme) => (!disabled && highlighted ? theme.palette.primary.light : undefined),
      }}
    >
      <IconButton
        className={
          !disabled
            ? `${filled && classes.btnFilled ? classes.btnFilled : ""} ${
                outlined && classes.btnOutlined ? classes.btnOutlined : ""
              } ${startOfRange && classes.btnStartOfRange ? classes.btnStartOfRange : ""} ${
                endOfRange && classes.btnEndOfRange ? classes.btnEndOfRange : ""
              }`
            : undefined
        }
        sx={{
          height: height || "36px",
          width: width || "36px",
          padding: padding,
          border: (theme) => (!disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined),
          ...(!disabled && filled
            ? {
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
                backgroundColor: (theme) => theme.palette.primary.dark,
              }
            : {}),
          borderRadius,
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        // size="large"
      >
        <Box>
          <Typography
            className={`${classes.text}${!disabled && filled && classes.filledText ? ` ${classes.filledText}` : ""}${
              isWeekend && classes.weekendText ? ` ${classes.weekendText}` : ""
            }`}
            sx={{
              lineHeight: 1.6,
              color: (theme) =>
                !disabled
                  ? filled
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
            variant="body2"
          >
            {value}
          </Typography>
          {renderDayCaption &&
            renderDayCaption({
              date,
              filled: !!filled,
              outlined: !!outlined,
              highlighted: !!highlighted,
              disabled: !!disabled,
              startOfRange: !!startOfRange,
              endOfRange: !!endOfRange,
            })}
        </Box>
      </IconButton>
    </Box>
  );
};

export default Day;

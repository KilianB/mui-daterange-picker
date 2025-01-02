import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { Box, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import React, { ReactNode } from "react";

interface HeaderProps {
  date: Date;
  variant?: "default" | "simple";
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
  customMonthLabels?: string[];
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
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
  renderPrevIcon,
  renderNextIcon,
  selectProps,
  variant,
  customMonthLabels,
  classes = {
    root: "",
    navWrap: "",
    nav: "",
  },
}: HeaderProps) => {
  if (variant === "simple") {
    const MONTHSLONG =
      typeof customMonthLabels !== "undefined" && customMonthLabels.length === 12
        ? customMonthLabels
        : typeof locale !== "undefined"
        ? [...Array(12).keys()].map((d) => locale.localize?.month(d, { width: "wide", context: "standalone" }))
        : [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

    return (
      <Box
        className={classes.root}
        width={"100%"}
        textAlign={"center"}
        marginY={"12px"}
        fontWeight={500}
        fontSize={"large"}
      >
        {MONTHSLONG[getMonth(date)]}
      </Box>
    );
  }

  const MONTHS =
    typeof customMonthLabels !== "undefined" && customMonthLabels.length === 12
      ? customMonthLabels
      : typeof locale !== "undefined"
      ? [...Array(12).keys()].map((d) => locale.localize?.month(d, { width: "abbreviated", context: "standalone" }))
      : ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid container className={classes.root} justifyContent="space-between" alignItems="center">
      <Grid item className={classes.navWrap} sx={{ padding: "5px" }}>
        <IconButton
          className={classes.nav}
          sx={{
            padding: "10px",
            "&:hover": {
              background: "none",
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          {renderPrevIcon ? renderPrevIcon(prevDisabled) : <ChevronLeft color={prevDisabled ? "disabled" : "action"} />}
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{ disablePortal: true }}
            {...selectProps}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            MenuProps={{ disablePortal: true }}
            {...selectProps}
          >
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item className={classes.navWrap} sx={{ padding: "5px" }}>
        <IconButton
          className={classes.nav}
          sx={{
            padding: "10px",
            "&:hover": {
              background: "none",
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          // size="large"
        >
          {renderNextIcon ? (
            renderNextIcon(nextDisabled)
          ) : (
            <ChevronRight color={nextDisabled ? "disabled" : "action"} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;

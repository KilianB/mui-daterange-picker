# MUI DateRange Picker

A react date range picker implementation using @mui (v5).

## Preview

![Screenshot](/screenshot.png?raw=true "Screenshot")

## Live Demo

Check out the project running [here](https://codesandbox.io/s/mui-daterange-picker-playground-for-pb-r9rmn?file=/src/App.js)!

## Usage

```bash
npm install @ks-erp/mui-daterange-picker --save

# or with yarn
yarn add @ks-erp/mui-daterange-picker
```

## Basic example
```tsx
import React from "react";
import { DateRangePicker, DateRange } from "@ks-erp/mui-daterange-picker";

type Props = {}

const App: React.FunctionComponent<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={open}
      toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />
  );
}

export default App;
```

## Types
```ts
interface DateRange {
    startDate?: Date,
    endDate?: Date
}

interface DefinedRange {
    label: string,
    startDate: Date,
    endDate: Date
}
```

## Props

Name | Type                      | Required | Default value | Description
:--- |:--------------------------| :--- | :--- | :---
`onChange` | `(DateRange) => void`     | _required_ | - | handler function for providing selected date range
`toggle` | `() => void`              | _required_ | - | function to show / hide the DateRangePicker
`initialDateRange` | `DateRange`               | _optional_ | `{}` | initially selected date range
`minDate` | `Date` or `string`        | _optional_ | 10 years ago | min date allowed in range
`maxDate` | `Date` or `string`        | _optional_ | 10 years from now | max date allowed in range
`definedRanges` | `DefinedRange[]`          | _optional_ | - | custom defined ranges to show in the list
`closeOnClickOutside` | `boolean`                 | _optional_ | `true` | defines if DateRangePicker will be closed when clicking outside of it
`wrapperClassName` | `object`                  | _optional_ | `undefined` | defines additional wrapper style classes
`locale` | `Locale`  (from date-dns) | _optional_ | `undefined` | defines locale to use (from date-fns package)
`DefinedRangesProps`|`object`| _optional_ | | ...
`MenuProps`|`object`| _optional_ | | ...
`MonthProps` | `object` | _optional_ | | ...
`MonthHeaderProps`|`object`| _optional_ | | ...
`MonthDayProps`|`object`| _optional_ | | ...

### `DefinedRangesProps`

```ts
type DefinedRangesProps = {
  className?: string; // Class applied to Root Defined Ranges Element
  classes?: {
    listItem?: string; // Class applied to Defined Ranges List
    listItemActive?: string; // Class applied to Matched Defined Ranges
    listItemTextTypography?: string; // Class applied to Defined Range Label
  },
  allowCustomRangeLabel?: boolean; // Allow non-match range label
  customRangeLabel?: string; // non-match label
}
```

### `MenuProps`

```ts
type MenuProps = {
  classes?: {
    rangesMenuDivider?: string; // Class applied to divider between Defined Ranges and Picker
    valueContainer?: string; // Class applied to picker value container
    valueItem?: string; // Class applied to picker value item
  };
  renderValue?: (valueType: "start" | "end", _?: Date, locale?: Locale) => React.ReactNode; // Function to render value
  hideRangeArrow?: boolean;
  hideHeaderDivider?: boolean;
  hideMonthDivider?: boolean;
}
```

### `MonthProps`

```ts
type MonthProps = {
  weekdaysDisplayLocale?: Locale;
  weekStartOn?: number; // 0 | 1 | 2 | 3 | 4 | 5 | 6
  classes?: {
    root?: string; // Class applied to Month Container
    dayInMonthGrid?: string;
    weekday?: string;
    weekend?: string;
  };
  containerSx?: SxProps; // MUI SxProps applied to Month Container
};
```

### `MonthHeaderProps`

```ts
type MonthHeaderProps = {
  customMonthLabels?: string[];
  classes?: {
    root?: string; // Class applied to Month Picker Container
    navWrap?: string; // Class applied to navigation wrap
    nav?: string; // Class applied to navigation
  };
  renderPrevIcon?: (disabled?: boolean) => React.ReactNode; // Render Function applied to Previous Month Navigation Icon
  renderNextIcon?: (disabled?: boolean) => React.ReactNode; // Render Function applied to Next Month Navigation Icon
  selectProps?: SelectProps<number>; // MUI Select Props, applied to Month/Year Select Element
}
```

### `MonthDayProps`

```ts
type MonthDayProps = {
  classes?: {
    root?: string; // Class applied to Day box button
    outlined?: string // Class applied to current date (outlined)
    highlighted?: string; // Class applied to highlighted days (days in range)
    btnFilled?: string; // Class applied to Start/End range day button
    text?: string; // Class applied to Day text
    weekendText?: string; // Class applied to Weekend day text
    filledText?: string; // Class applied to Start/End Range text
    startOfRange?: string; // Class applied to Start range day wrapper
    endOfRange?: string; // Class applied to End range day wrapper
    btnStartOfRange?: string; // Class applied to Start range day button
    btnEndOfRange?: string; // Class applied to End range day button
  };
  borderRadius?: string; // Radius of Day button
  height?: any; // In px or number, heigh of Day button
}
```

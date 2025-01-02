import DateRangePickerExporter from "./components/DateRangePickerExporter";
import DateRangePicker from "./components/DateRangePicker";
import { DateRange, DefinedRange } from "./types";

//The date range picker exporter wraps the date range picker into a component to take care of 
//closing it on click outside. But this also creates an overlay which prevents scrolling

export {
  DateRangePickerExporter as DateRangePicker,
  DateRangePicker as DateRangePickerComponent
};
export type {
  DefinedRange,
  DateRange
};


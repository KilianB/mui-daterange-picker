import React from "react";
import { DateRangePicker, DateRange } from "../dist/index";

type Props = {};

const App: React.FunctionComponent<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  const ref = React.useRef<HTMLElement>(null);

  return (
    <div ref={ref}>
      <DateRangePicker  anchorRef={ref} open={open} toggle={toggle} onChange={(range: DateRange) => setDateRange(range)} />;
    </div>
  );
};

export default App;

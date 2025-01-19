import React from "react";
import { DateRangePicker, DateRange } from "../dist/index";

type Props = {};

const App: React.FunctionComponent<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);
  console.log(dateRange);

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <DateRangePicker popperModifiers={undefined}  anchorRef={ref} open={open} toggle={toggle} onChange={(range: DateRange) => setDateRange(range)} />;
    </div>
  );
};

export default App;

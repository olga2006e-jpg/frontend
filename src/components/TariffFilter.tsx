import { Form, Button } from "react-bootstrap";

interface Props {
  from: number;
  to: number;
  onChangeFrom: (v: number) => void;
  onChangeTo: (v: number) => void;
  onSubmit: () => void;
}

export default function TariffFilter({ from, to, onChangeFrom, onChangeTo, onSubmit }: Props) {
  return (
    <Form 
      className="filter-row" 
      onSubmit={(e) => { 
        e.preventDefault(); 
        onSubmit(); 
      }}
      style={{ display: "flex", alignItems: "stretch", gap: "10px", width: "100%" }}
    >
      <div className="slider-wrap" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="slider-row" style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", alignItems: "center", gap: "8px" }}>
          <span className="slider-caption">от</span>
          <Form.Range
            id="tariff-from"
            min="0"
            max="1000"
            step="10"
            value={from}
            onChange={(e) => onChangeFrom(Number(e.target.value))}
          />
          <b className="slider-value">{from}</b>
        </div>
        <div className="slider-row" style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", alignItems: "center", gap: "8px" }}>
          <span className="slider-caption">до</span>
          <Form.Range
            id="tariff-to"
            min="0"
            max="1000"
            step="10"
            value={to}
            onChange={(e) => onChangeTo(Number(e.target.value))}
          />
          <b className="slider-value">{to}</b>
        </div>
      </div>
      <Button type="submit" className="search-button">Поиск</Button>
    </Form>
  );
}
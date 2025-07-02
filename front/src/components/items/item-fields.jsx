import CheckBoxInput from "../ui/CheckBoxInput";
import Dropdown from "../ui/Dropdown"; // Ajuste o caminho se necessário
import Input from "../ui/Input"; // Ajuste o caminho se necessário
import { heightOptions, usageTypeOptions, widthOptions } from "./Item-form-options";

export function InventorySizeFields({ form, handleChange }) {
  return (
    <div className="form-row">
      <Dropdown
        label="Largura no Inventário"
        value={form.widthSquare}
        onChange={(v) => handleChange("widthSquare", +v)}
        options={widthOptions}
      />
      <Dropdown
        label="Altura no Inventário"
        value={form.heightSquare}
        onChange={(v) => handleChange("heightSquare", +v)}
        options={heightOptions}
      />
    </div>
  );
}

export function DamageFields({ form, handleChange }) {
  return (
    <>
      <Input placeholder="Dano Primário" value={form.damage1Square} onChange={(v) => handleChange("damage1Square", v)} />
      <Input placeholder="Dano Secundário" value={form.damage2Square} onChange={(v) => handleChange("damage2Square", v)} />
    </>
  );
}

export function UsageFields({ form, handleChange }) {
  return (
    <>
      <div className="form-row">
        <Dropdown
          label="Tipo de Uso"
          value={form.usageTypeSquare}
          onChange={(v) => handleChange("usageTypeSquare", v)}
          options={usageTypeOptions}
        />
        <CheckBoxInput label="Este item é mágico?" checked={form.isMagical} onChange={(v) => handleChange("isMagical", v)} />
      </div>
      <Input placeholder="Uso Atual" type="number" value={form.currentUsageSquare} onChange={(v) => handleChange("currentUsageSquare", +v)} />
      <Input placeholder="Uso Máximo" type="number" value={form.maxUsageSquare} onChange={(v) => handleChange("maxUsageSquare", +v)} />
    </>
  );
}

import Input from "../ui/Input";
import { DamageFields, InventorySizeFields, UsageFields } from "./item-fields";

export default function TemplateRenderer({ template, form, handleChange }) {
  const fieldProps = { form, handleChange };

  switch (template) {
    case "arma":
      return (
        <>
          <InventorySizeFields {...fieldProps} />
          <DamageFields {...fieldProps} />
          <Input
            as="textarea"
            className="input-descricao-grande"
            placeholder="Descrição Detalhada"
            value={form.descriptionSquare}
            onChange={(v) => handleChange("descriptionSquare", v)}
          />
          <UsageFields {...fieldProps} />
          <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={(v) => handleChange("pesoSquare", +v)} />
        </>
      );
    case "armadura":
      return (
        <>
          <InventorySizeFields {...fieldProps} />
          <Input
            placeholder="Valor da Armadura/Defesa"
            type="number"
            value={form.valueArmorSquare}
            onChange={(v) => handleChange("valueArmorSquare", +v)}
          />
          <Input
            as="textarea"
            className="input-descricao-grande"
            placeholder="Descrição Detalhada"
            value={form.descriptionSquare}
            onChange={(v) => handleChange("descriptionSquare", v)}
          />
          <UsageFields {...fieldProps} />
          <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={(v) => handleChange("pesoSquare", +v)} />
        </>
      );
    case "feitiço":
      return (
        <>
          <InventorySizeFields {...fieldProps} />
          <Input
            placeholder="Efeito Principal do Feitiço"
            value={form.effectDescription}
            onChange={(v) => handleChange("effectDescription", v)}
          />
          <Input
            as="textarea"
            className="input-descricao-grande"
            placeholder="Descrição Detalhada"
            value={form.descriptionSquare}
            onChange={(v) => handleChange("descriptionSquare", v)}
          />
          <UsageFields {...fieldProps} />
        </>
      );
    case "condição":
      return (
        <>
          <InventorySizeFields {...fieldProps} />
          <Input
            placeholder="Efeito da Condição"
            value={form.conditionEffectSquare}
            onChange={(v) => handleChange("conditionEffectSquare", v)}
          />
          <Input
            as="textarea"
            className="input-descricao-grande"
            placeholder="Descrição Detalhada"
            value={form.descriptionSquare}
            onChange={(v) => handleChange("descriptionSquare", v)}
          />
        </>
      );
    case "livre":
      return (
        <>
          <InventorySizeFields {...fieldProps} />
          <DamageFields {...fieldProps} />
          <Input
            placeholder="Valor da Armadura/Defesa"
            type="number"
            value={form.valueArmorSquare}
            onChange={(v) => handleChange("valueArmorSquare", +v)}
          />
          <Input
            placeholder="Efeito Principal do Feitiço"
            value={form.effectDescription}
            onChange={(v) => handleChange("effectDescription", v)}
          />
          <Input
            placeholder="Efeito da Condição"
            value={form.conditionEffectSquare}
            onChange={(v) => handleChange("conditionEffectSquare", v)}
          />
          <Input
            as="textarea"
            className="input-descricao-grande"
            placeholder="Descrição Detalhada"
            value={form.descriptionSquare}
            onChange={(v) => handleChange("descriptionSquare", v)}
          />
          <UsageFields {...fieldProps} />
          <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={(v) => handleChange("pesoSquare", +v)} />
        </>
      );
    default:
      return null;
  }
}

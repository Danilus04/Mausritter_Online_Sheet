import './styles/StatusBox.css';

function StatusBox({ label, currentValue, maxValue, onChangeCurrent, onChangeMax }) {
  return (
    <div className="status-box">
      <div className="status-section status-label">
        {label}
      </div>

      <div className="status-divider"></div>

      <input
        type="number"
        className="status-section status-input"
        value={currentValue ?? ''}
        onChange={(e) => onChangeCurrent(parseInt(e.target.value) || 0)}
        placeholder="Atual"
      />

      <div className="status-divider"></div>

      <input
        type="number"
        className="status-section status-input"
        value={maxValue ?? ''}
        onChange={(e) => onChangeMax(parseInt(e.target.value) || 0)}
        placeholder="Máximo"
      />
    </div>
  );
}

export default StatusBox;

export type UnitStyle = {
  color: string;
  backgroundColor: string;
};

export enum UnitState {
  Active,
  CoActive,
  Normal,
  Error,
}

const errorColor = '#e66372';
const errorBgColor = '#f6ced6'; 
const normalColor = '#344861';
const normalBgColor = 'white';
const coActiveBgColor = '#E5EBFF';
const activeBgColor = '#9EC1FD';

export const getStyle = (unitStates: Set<UnitState>): UnitStyle => {
  let style = { color: normalColor, backgroundColor: normalBgColor };
  if (unitStates.has(UnitState.CoActive)) style.backgroundColor = coActiveBgColor;
  if (unitStates.has(UnitState.Error)) style.backgroundColor = errorBgColor;
  if (unitStates.has(UnitState.Active)) style.backgroundColor = activeBgColor;
  if (unitStates.has(UnitState.Error)) style.color = errorColor;
  return style;
};

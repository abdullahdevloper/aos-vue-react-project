import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  Dialog,
  DialogActions,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccessTime, Code, GitHub, InvertColors } from "@mui/icons-material";
import DocPage from "../../../components/vuetify-docs/DocPage";
import DocText from "../../../components/vuetify-docs/DocText";

const primary = "#0097a7";
const greenLighten1 = "#66bb6a";
const clockLight = "#e0e0e0";
const indeterminateTime = "#bdbdbd";
const pickerBody = "#fff";
const disabledText = "rgba(0,0,0,.26)";
const primaryTransition = "0.3s cubic-bezier(0.25, 0.8, 0.5, 1)";
const shadow2 = "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)";
const neuInset = "inset -2px -2px 3px rgba(255,255,255,.52), inset 2px 2px 4px rgba(174,174,192,.12)";

type Selecting = "hour" | "minute" | "second";
type Period = "am" | "pm";
type TimeFormat = "ampm" | "24hr";
type TimeValue = string | null;
type Allowed = ((value: number) => boolean) | number[];
type ExampleKey = keyof typeof sourceTemplates;

const pad = (value: number) => String(value).padStart(2, "0");
const resolveColor = (value?: string) => (value === "green lighten-1" ? greenLighten1 : value === "primary" || !value ? primary : value);
const convert24to12 = (hour: number | null) => (hour ? ((hour - 1) % 12) + 1 : 12);
const convert12to24 = (hour: number, period: Period) => (hour % 12) + (period === "pm" ? 12 : 0);

function parseTime(value?: string | null): [number | null, number | null, number | null] {
  if (value == null || value === "") return [null, null, null];
  const match = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/);
  if (!match) return [null, null, null];
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[4] || 0);
  if (match[5]) hour = convert12to24(hour, match[5] as Period);
  return [hour, minute, second];
}

function makeValue(hour: number | null, minute: number | null, second: number | null, useSeconds: boolean) {
  if (hour == null || minute == null || (useSeconds && second == null)) return null;
  return `${pad(hour)}:${pad(minute)}${useSeconds ? `:${pad(second ?? 0)}` : ""}`;
}

function allowedToFn(allowed?: Allowed) {
  if (!allowed) return undefined;
  return Array.isArray(allowed) ? (value: number) => allowed.includes(value) : allowed;
}

interface VTimePickerProps {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
  color?: string;
  headerColor?: string;
  disabled?: boolean;
  readonly?: boolean;
  format?: TimeFormat;
  landscape?: boolean;
  fullWidth?: boolean;
  noTitle?: boolean;
  width?: number;
  ampmInTitle?: boolean;
  useSeconds?: boolean;
  scrollable?: boolean;
  allowedHours?: Allowed;
  allowedMinutes?: Allowed;
  allowedSeconds?: Allowed;
  min?: string | null;
  max?: string | null;
  onClickMinute?: () => void;
  onClickSecond?: () => void;
  actions?: ReactNode;
}

function VTimePicker({
  value = null,
  onChange,
  color,
  headerColor,
  disabled = false,
  readonly = false,
  format = "ampm",
  landscape = false,
  fullWidth = false,
  noTitle = false,
  width = 290,
  ampmInTitle = false,
  useSeconds = false,
  scrollable = false,
  allowedHours,
  allowedMinutes,
  allowedSeconds,
  min,
  max,
  onClickMinute,
  onClickSecond,
  actions,
}: VTimePickerProps) {
  const [inputHour, setInputHourState] = useState<number | null>(() => parseTime(value)[0]);
  const [inputMinute, setInputMinuteState] = useState<number | null>(() => parseTime(value)[1]);
  const [inputSecond, setInputSecondState] = useState<number | null>(() => parseTime(value)[2]);
  const [lazyHour, setLazyHour] = useState<number | null>(null);
  const [lazyMinute, setLazyMinute] = useState<number | null>(null);
  const [lazySecond, setLazySecond] = useState<number | null>(null);
  const [selecting, setSelecting] = useState<Selecting>("hour");
  const [period, setPeriodState] = useState<Period>(() => (parseTime(value)[0] == null || (parseTime(value)[0] ?? 0) < 12 ? "am" : "pm"));
  const [dragging, setDragging] = useState(false);
  const clockRef = useRef<HTMLDivElement | null>(null);

  const isAmPm = format === "ampm";
  const activeColor = resolveColor(color);
  const titleColor = resolveColor(headerColor || color);
  const hourAllowed = allowedToFn(allowedHours);
  const minuteAllowed = allowedToFn(allowedMinutes);
  const secondAllowed = allowedToFn(allowedSeconds);

  useEffect(() => {
    const [hour, minute, second] = parseTime(value);
    setInputHourState(hour);
    setInputMinuteState(minute);
    setInputSecondState(second);
    setPeriodState(hour == null || hour < 12 ? "am" : "pm");
  }, [value]);

  const minHour = min ? Number(min.split(":")[0]) : 0;
  const maxHour = max ? Number(max.split(":")[0]) : 23;
  const minMinute = min ? Number(min.split(":")[1] || 0) : 0;
  const maxMinute = max ? Number(max.split(":")[1] || 59) : 59;
  const minSecond = min ? Number(min.split(":")[2] || 0) : 0;
  const maxSecond = max ? Number(max.split(":")[2] || 59) : 59;

  function isAllowedHour(valueHour: number) {
    return valueHour >= minHour && valueHour <= maxHour && (!hourAllowed || hourAllowed(valueHour));
  }

  function isAllowedMinute(valueMinute: number) {
    const isHourOk = !hourAllowed || inputHour === null || hourAllowed(inputHour);
    if (!isHourOk) return false;
    if (!minuteAllowed && !min && !max) return true;
    const minTime = minHour * 60 + minMinute;
    const maxTime = maxHour * 60 + maxMinute;
    const time = 60 * (inputHour ?? 0) + valueMinute;
    return time >= minTime && time <= maxTime && (!minuteAllowed || minuteAllowed(valueMinute));
  }

  function isAllowedSecond(valueSecond: number) {
    const isHourOk = !hourAllowed || inputHour === null || hourAllowed(inputHour);
    const isMinuteOk = isHourOk && (!minuteAllowed || inputMinute === null || minuteAllowed(inputMinute));
    if (!isMinuteOk) return false;
    if (!secondAllowed && !min && !max) return true;
    const minTime = minHour * 3600 + minMinute * 60 + minSecond;
    const maxTime = maxHour * 3600 + maxMinute * 60 + maxSecond;
    const time = 3600 * (inputHour ?? 0) + 60 * (inputMinute ?? 0) + valueSecond;
    return time >= minTime && time <= maxTime && (!secondAllowed || secondAllowed(valueSecond));
  }

  function allowedForCurrent(valueNumber: number) {
    if (selecting === "hour") return isAllowedHour(valueNumber);
    if (selecting === "minute") return isAllowedMinute(valueNumber);
    return isAllowedSecond(valueNumber);
  }

  function emitValue(nextHour = inputHour, nextMinute = inputMinute, nextSecond = inputSecond) {
    const next = makeValue(nextHour, nextMinute, nextSecond, useSeconds);
    if (next !== null) onChange?.(next);
    return next;
  }

  function setHour(nextHour: number) {
    if (disabled || readonly || !isAllowedHour(nextHour)) return;
    setInputHourState(nextHour);
    emitValue(nextHour, inputMinute, inputSecond);
  }

  function setMinute(nextMinute: number) {
    if (disabled || readonly || !isAllowedMinute(nextMinute)) return;
    setInputMinuteState(nextMinute);
    emitValue(inputHour, nextMinute, inputSecond);
  }

  function setSecond(nextSecond: number) {
    if (disabled || readonly || !isAllowedSecond(nextSecond)) return;
    setInputSecondState(nextSecond);
    emitValue(inputHour, inputMinute, nextSecond);
  }

  function firstAllowed(type: Selecting, requested: number) {
    const range = type === "hour"
      ? (isAmPm ? Array.from({ length: 12 }, (_, index) => (requested < 12 ? index : index + 12)) : Array.from({ length: 24 }, (_, index) => index))
      : Array.from({ length: 60 }, (_, index) => index);
    const index = range.find((candidate) => {
      const wrapped = ((candidate + requested) % range.length) + range[0];
      if (type === "hour") return isAllowedHour(wrapped);
      if (type === "minute") return isAllowedMinute(wrapped);
      return isAllowedSecond(wrapped);
    });
    return ((index || 0) + requested) % range.length + range[0];
  }

  function setPeriod(nextPeriod: Period) {
    if (disabled || readonly) return;
    setPeriodState(nextPeriod);
    if (inputHour != null) {
      const newHour = inputHour + (nextPeriod === "am" ? -12 : 12);
      const nextHour = firstAllowed("hour", newHour);
      setInputHourState(nextHour);
      emitValue(nextHour, inputMinute, inputSecond);
    }
  }

  function inputForCurrent() {
    if (selecting === "hour") return inputHour;
    if (selecting === "minute") return inputMinute;
    return inputSecond;
  }

  function onInput(rawValue: number) {
    if (selecting === "hour") setHour(isAmPm ? convert12to24(rawValue, period) : rawValue);
    else if (selecting === "minute") setMinute(rawValue);
    else setSecond(rawValue);
  }

  function onChangeClock(rawValue: number) {
    if (selecting === "hour") setSelecting("minute");
    else if (useSeconds && selecting === "minute") setSelecting("second");

    const time = makeValue(
      selecting === "hour" ? (isAmPm ? convert12to24(rawValue, period) : rawValue) : inputHour,
      selecting === "minute" ? rawValue : inputMinute,
      selecting === "second" ? rawValue : inputSecond,
      useSeconds,
    );
    if (time == null) return;

    if (inputHour === lazyHour && inputMinute === lazyMinute && (!useSeconds || inputSecond === lazySecond)) return;
    setLazyHour(inputHour);
    setLazyMinute(inputMinute);
    if (useSeconds) setLazySecond(inputSecond);
    if (selecting === "minute" && !useSeconds) onClickMinute?.();
    if (selecting === "second") onClickSecond?.();
  }

  const clockConfig = useMemo(() => {
    if (selecting === "hour") {
      return {
        min: isAmPm && period === "pm" ? 12 : 0,
        max: isAmPm && period === "am" ? 11 : 23,
        step: 1,
        double: !isAmPm,
        formatValue: (valueNumber: number) => (isAmPm ? String(convert24to12(valueNumber)) : String(valueNumber)),
      };
    }
    return {
      min: 0,
      max: 59,
      step: 5,
      double: false,
      formatValue: (valueNumber: number) => pad(valueNumber),
    };
  }, [selecting, isAmPm, period]);

  function angleToValue(angle: number, insideClick: boolean) {
    const count = clockConfig.max - clockConfig.min + 1;
    const roundCount = clockConfig.double ? count / 2 : count;
    const degreesPerUnit = 360 / roundCount;
    const value = (Math.round(angle / degreesPerUnit) + (insideClick ? roundCount : 0)) % count + clockConfig.min;
    if (angle < 360 - degreesPerUnit / 2) return value;
    return insideClick ? clockConfig.max - roundCount + 1 : clockConfig.min;
  }

  function pointerToValue(event: { clientX: number; clientY: number }) {
    const node = clockRef.current;
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    const width = rect.width;
    const center = { x: width / 2, y: -width / 2 };
    const coords = { x: event.clientX - rect.left, y: rect.top - event.clientY };
    const dx = coords.x - center.x;
    const dy = coords.y - center.y;
    const euclidean = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.abs((2 * Math.atan2(coords.y - center.y - euclidean, coords.x - center.x) * 180) / Math.PI);
    const handAngle = Math.round(angle + 360) % 360;
    const insideClick = clockConfig.double && euclidean < (width + width * 0.62) / 4;
    const count = clockConfig.max - clockConfig.min + 1;
    const degreesPerUnit = 360 / (clockConfig.double ? count / 2 : count);
    const checks = Math.ceil(15 / degreesPerUnit);
    for (let index = 0; index < checks; index += 1) {
      const plus = angleToValue(handAngle + index * degreesPerUnit, insideClick);
      if (allowedForCurrent(plus)) return plus;
      const minus = angleToValue(handAngle - index * degreesPerUnit, insideClick);
      if (allowedForCurrent(minus)) return minus;
    }
    return null;
  }

  function applyPointer(event: { clientX: number; clientY: number }, commit = false) {
    const next = pointerToValue(event);
    if (next == null) return;
    onInput(next);
    if (commit) onChangeClock(next);
  }

  useEffect(() => {
    if (!dragging) return undefined;
    const move = (event: MouseEvent) => applyPointer(event);
    const up = (event: MouseEvent) => {
      applyPointer(event, true);
      setDragging(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, selecting, inputHour, inputMinute, inputSecond, period, clockConfig]);

  function onWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (!scrollable || disabled || readonly) return;
    event.preventDefault();
    const delta = Math.sign(-event.deltaY || 1);
    const count = clockConfig.max - clockConfig.min + 1;
    let next = inputForCurrent() ?? clockConfig.min;
    do {
      next += delta;
      next = ((next - clockConfig.min + count) % count) + clockConfig.min;
    } while (!allowedForCurrent(next) && next !== (inputForCurrent() ?? clockConfig.min));
    if (next !== (inputForCurrent() ?? clockConfig.min)) onInput(next);
  }

  const clockValue = inputForCurrent();
  const displayedValue = clockValue == null ? clockConfig.min : clockValue;
  const count = clockConfig.max - clockConfig.min + 1;
  const roundCount = clockConfig.double ? count / 2 : count;
  const degreesPerUnit = 360 / roundCount;
  const handScale = clockConfig.double && displayedValue - clockConfig.min >= roundCount ? 0.62 : 1;
  const handAngle = degreesPerUnit * (displayedValue - clockConfig.min);
  const bodyWidth = fullWidth ? "auto" : width;
  const pickerWidth = fullWidth ? "100%" : landscape && !noTitle ? width + 170 : width;
  const clockSize = Number(width) - (!fullWidth && landscape ? 80 : 20);

  const values = [];
  for (let valueNumber = clockConfig.min; valueNumber <= clockConfig.max; valueNumber += clockConfig.step) values.push(valueNumber);

  return (
    <Box
      className="v-picker v-card v-picker--time"
      sx={{
        position: "relative",
        contain: "layout style",
        display: fullWidth ? "flex" : "inline-flex",
        flexDirection: "column",
        verticalAlign: "top",
        fontSize: "1rem",
        borderRadius: "4px",
        width: pickerWidth,
        maxWidth: "100%",
        bgcolor: pickerBody,
        boxShadow: shadow2,
        overflow: "hidden",
      }}
    >
      {!noTitle && (
        <Box
          className="v-picker__title"
          sx={{
            bgcolor: titleColor,
            color: "#fff",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: landscape ? 0 : "4px",
            borderBottomRightRadius: landscape ? 0 : undefined,
            width: landscape ? 170 : "auto",
            height: landscape ? "100%" : "auto",
            position: landscape ? "absolute" : "relative",
            top: 0,
            left: 0,
            zIndex: 1,
            p: landscape ? 0 : 2,
            display: "flex",
            alignItems: landscape ? "center" : "flex-start",
            justifyContent: landscape ? "center" : "flex-end",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: landscape ? "column" : "row", justifyContent: landscape ? "center" : "flex-end", color: "#fff", lineHeight: 1 }}>
            <Box sx={{ whiteSpace: "nowrap", direction: "ltr", textAlign: landscape ? "center" : "right" }}>
              <TitleButton active={selecting === "hour"} disabled={disabled} landscape={landscape} onClick={() => !disabled && setSelecting("hour")}>
                {inputHour == null ? "--" : isAmPm ? String(convert24to12(inputHour)) : pad(inputHour)}
              </TitleButton>
              <Box component="span" sx={titleSeparatorSx(landscape)}>:</Box>
              <TitleButton active={selecting === "minute"} disabled={disabled} landscape={landscape} onClick={() => !disabled && setSelecting("minute")}>
                {inputMinute == null ? "--" : pad(inputMinute)}
              </TitleButton>
              {useSeconds && (
                <>
                  <Box component="span" sx={titleSeparatorSx(landscape)}>:</Box>
                  <TitleButton active={selecting === "second"} disabled={disabled} landscape={landscape} onClick={() => !disabled && setSelecting("second")}>
                    {inputSecond == null ? "--" : pad(inputSecond)}
                  </TitleButton>
                </>
              )}
            </Box>
            {isAmPm && (
              <Box
                sx={{
                  alignSelf: landscape ? "initial" : "flex-end",
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 16,
                  textTransform: "uppercase",
                  ml: landscape ? 0 : 1,
                  mb: landscape ? 0 : "6px",
                  mt: landscape ? 2 : 0,
                  textAlign: landscape ? "center" : "left",
                }}
              >
                {(!(!ampmInTitle) || period === "am") && (
                  <TitleButton small active={period === "am" && ampmInTitle} disabled={disabled || readonly || !ampmInTitle} onClick={() => setPeriod("am")}>AM</TitleButton>
                )}
                {(!(!ampmInTitle) || period === "pm") && (
                  <TitleButton small active={period === "pm" && ampmInTitle} disabled={disabled || readonly || !ampmInTitle} onClick={() => setPeriod("pm")}>PM</TitleButton>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box
        className="v-picker__body"
        sx={{
          width: bodyWidth,
          height: "auto",
          overflow: "hidden",
          position: "relative",
          zIndex: 0,
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: pickerBody,
          margin: fullWidth ? "initial" : "0 auto",
          ml: landscape && !noTitle ? "170px" : fullWidth ? "initial" : "auto",
          maxWidth: "100%",
        }}
      >
        <Box
          className="v-time-picker-clock__container"
          key={selecting}
          sx={{
            display: "flex",
            flexDirection: landscape ? "row" : "column",
            justifyContent: "center",
            p: "10px",
            position: "relative",
            width: fullWidth ? "100%" : clockSize,
            maxWidth: fullWidth ? 290 : "none",
            minHeight: fullWidth ? 290 : clockSize,
          }}
        >
          {!ampmInTitle && isAmPm && (
            <Box
              sx={{
                display: "flex",
                flexDirection: landscape ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                position: "absolute",
                inset: 0,
                p: "10px",
                color: activeColor,
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <ClockPeriodButton disabled={disabled || readonly} active={period === "am"} onClick={() => setPeriod("am")}>AM</ClockPeriodButton>
              <ClockPeriodButton disabled={disabled || readonly} active={period === "pm"} onClick={() => setPeriod("pm")}>PM</ClockPeriodButton>
            </Box>
          )}
          <Box
            ref={clockRef}
            className="v-time-picker-clock"
            onMouseDown={(event) => {
              if (readonly || disabled) return;
              event.preventDefault();
              setDragging(true);
              applyPointer(event);
            }}
            onWheel={onWheel}
            sx={{
              borderRadius: "100%",
              position: "relative",
              transition: primaryTransition,
              userSelect: "none",
              width: fullWidth ? "100%" : clockSize,
              maxWidth: clockSize,
              height: fullWidth ? undefined : clockSize,
              pt: fullWidth ? "100%" : 0,
              flex: "1 0 auto",
              bgcolor: clockLight,
              cursor: disabled || readonly ? "default" : "pointer",
            }}
          >
            <Box
              className="v-time-picker-clock__inner"
              sx={{
                position: "absolute",
                inset: "27px",
              }}
            >
              <Box
                className="v-time-picker-clock__hand"
                sx={{
                  height: "calc(50% - 4px)",
                  width: 2,
                  bottom: "50%",
                  left: "calc(50% - 1px)",
                  transformOrigin: "center bottom",
                  position: "absolute",
                  willChange: "transform",
                  zIndex: 1,
                  bgcolor: clockValue == null ? indeterminateTime : activeColor,
                  borderColor: clockValue == null ? indeterminateTime : activeColor,
                  transform: `rotate(${handAngle}deg) scaleY(${handScale})`,
                  transition: primaryTransition,
                  "&:before": {
                    content: '""',
                    bgcolor: "transparent",
                    border: "2px solid",
                    borderColor: "inherit",
                    borderRadius: "100%",
                    width: 10,
                    height: 10,
                    position: "absolute",
                    top: -4,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    height: handScale < 1 ? 14 : 8,
                    width: 8,
                    top: "100%",
                    left: "50%",
                    borderRadius: "100%",
                    border: "solid",
                    borderColor: "inherit",
                    bgcolor: "inherit",
                    transform: "translate(-50%, -50%)",
                  },
                }}
              />
              {values.map((valueNumber) => {
                const itemScale = clockConfig.double && valueNumber - clockConfig.min >= roundCount ? 0.62 : 1;
                const angleRad = ((valueNumber - clockConfig.min) * degreesPerUnit * Math.PI) / 180;
                const left = 50 + Math.sin(angleRad) * itemScale * 50;
                const top = 50 - Math.cos(angleRad) * itemScale * 50;
                const active = valueNumber === displayedValue;
                const isAllowed = allowedForCurrent(valueNumber);
                const activeFill = active ? (clockValue == null ? indeterminateTime : activeColor) : "transparent";
                return (
                  <Box
                    key={valueNumber}
                    className="v-time-picker-clock__item"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!isAllowed || disabled || readonly) return;
                      onInput(valueNumber);
                      onChangeClock(valueNumber);
                    }}
                    sx={{
                      alignItems: "center",
                      borderRadius: "100%",
                      cursor: "default",
                      display: "flex",
                      fontSize: 16,
                      justifyContent: "center",
                      height: 40,
                      position: "absolute",
                      textAlign: "center",
                      width: 40,
                      userSelect: "none",
                      transform: "translate(-50%, -50%)",
                      left: `${left}%`,
                      top: `${top}%`,
                      color: disabled || !isAllowed ? disabledText : active ? "#fff" : "rgba(0,0,0,.87)",
                      bgcolor: activeFill,
                      zIndex: active ? 2 : 1,
                      pointerEvents: disabled || !isAllowed ? "none" : "auto",
                      transition: primaryTransition,
                      "& > span": { zIndex: 1 },
                    }}
                  >
                    <span>{clockConfig.formatValue(valueNumber)}</span>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      {actions && <Box sx={{ display: "flex", alignItems: "center", minHeight: 52, p: 1 }}>{actions}</Box>}
    </Box>
  );
}

function TitleButton({ children, active, disabled, landscape = false, small = false, onClick }: { children: ReactNode; active: boolean; disabled?: boolean; landscape?: boolean; small?: boolean; onClick: () => void }) {
  const size = small ? 16 : landscape ? 55 : 70;
  return (
    <Box
      component="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      sx={{
        appearance: "none",
        border: 0,
        bgcolor: "transparent",
        color: "inherit",
        p: 0,
        alignItems: "center",
        display: "inline-flex",
        height: small ? 22 : size,
        minWidth: 0,
        justifyContent: "center",
        fontSize: size,
        fontFamily: "inherit",
        lineHeight: 1,
        opacity: active ? 1 : 0.6,
        cursor: disabled ? "default" : active ? "default" : "pointer",
        transition: primaryTransition,
        "&:hover": { opacity: disabled ? undefined : 1 },
      }}
    >
      {children}
    </Box>
  );
}

function ClockPeriodButton({ children, active, disabled, onClick }: { children: ReactNode; active: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      sx={{
        pointerEvents: "auto",
        appearance: "none",
        border: 0,
        bgcolor: "transparent",
        color: "inherit",
        font: "inherit",
        opacity: active ? 1 : 0.6,
        cursor: disabled ? "default" : "pointer",
        textTransform: "uppercase",
        transition: primaryTransition,
        p: 0,
        "&:hover": { opacity: disabled ? undefined : 1 },
      }}
    >
      {children}
    </Box>
  );
}

const titleSeparatorSx = (landscape: boolean) => ({
  alignItems: "center",
  display: "inline-flex",
  height: landscape ? 55 : 70,
  fontSize: landscape ? 55 : 70,
  justifyContent: "center",
  opacity: 1,
});

function VuetifyExampleBlock({ title, description, source, children }: { title: string; description: ReactNode; source: ExampleKey; children: () => ReactNode }) {
  const [inverted, setInverted] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  return (
    <Card sx={{ mb: 5, bgcolor: "background.default", boxShadow: neuInset, borderRadius: 1, overflow: "visible" }}>
      <Toolbar variant="dense" sx={{ minHeight: 48, height: 48, px: 2, bgcolor: "transparent" }}>
        {title && <Typography sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400 }}>{title}</Typography>}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Invert example colors"><IconButton size="small" onClick={() => setInverted((value) => !value)} sx={exampleIconSx(inverted)}><InvertColors sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View on Github"><IconButton size="small" sx={exampleIconSx(false)}><GitHub sx={{ fontSize: 16 }} /></IconButton></Tooltip>
        <Tooltip title="View source"><IconButton size="small" onClick={() => setSourceOpen((value) => !value)} sx={exampleIconSx(sourceOpen)}><Code sx={{ fontSize: 16 }} /></IconButton></Tooltip>
      </Toolbar>
      <Collapse in={sourceOpen} timeout={180} unmountOnExit>
        <Box sx={{ bgcolor: "#2d2d2d", color: "#f8f8f2", overflowX: "auto", p: 2 }}>
          <Box component="pre" sx={{ m: 0, fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{sourceTemplates[source]}</Box>
        </Box>
      </Collapse>
      <Box sx={{ bgcolor: inverted ? "#303030" : "transparent", color: inverted ? "rgba(255,255,255,.92)" : "inherit", p: 2, overflow: "visible" }}>
        {description && <Typography sx={{ color: inverted ? "rgba(255,255,255,.72)" : "text.secondary", fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.55, mb: 3 }}>{description}</Typography>}
        <Box data-app="true" sx={{ overflow: "visible" }}>{children()}</Box>
      </Box>
    </Card>
  );
}

function CodePill({ children }: { children: ReactNode }) {
  return <Box component="code" sx={{ px: 0.55, py: 0.18, borderRadius: 0.75, bgcolor: "rgba(244,67,54,.08)", color: "#e53935", fontFamily: "'Roboto Mono', Consolas, monospace", fontSize: "88%" }}>{children}</Box>;
}

function exampleIconSx(active: boolean) {
  return { width: 30, height: 30, ml: 0.5, color: active ? primary : "text.secondary", bgcolor: active ? "rgba(0,151,167,.12)" : "transparent", "&:hover": { bgcolor: active ? "rgba(0,151,167,.18)" : "rgba(0,0,0,.04)" } };
}

function CenterRow({ children, justify = "center", align = "stretch" }: { children: ReactNode; justify?: string; align?: string }) {
  return <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: justify, alignItems: align, gap: 3, mx: 0 }}>{children}</Box>;
}

function UsageExample() {
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow><VTimePicker value={picker} onChange={setPicker} /></CenterRow>;
}

function ColorableExample() {
  const [e4, setE4] = useState<TimeValue>(null);
  return <CenterRow justify="space-around"><VTimePicker value={e4} onChange={setE4} color="green lighten-1" /><VTimePicker value={e4} onChange={setE4} color="green lighten-1" headerColor="primary" /></CenterRow>;
}

function DisabledExample() {
  const theme = useTheme();
  const landscape = useMediaQuery(theme.breakpoints.up("sm"));
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around" align="center"><VTimePicker value={picker} onChange={setPicker} disabled /><VTimePicker value={picker} onChange={setPicker} disabled landscape={landscape} /></CenterRow>;
}

function ReadonlyExample() {
  const theme = useTheme();
  const landscape = useMediaQuery(theme.breakpoints.up("sm"));
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around" align="center"><VTimePicker value={picker} onChange={setPicker} readonly /><VTimePicker value={picker} onChange={setPicker} readonly landscape={landscape} /></CenterRow>;
}

function Format24Example() {
  const [e7, setE7] = useState<TimeValue>(null);
  return <CenterRow justify="space-around"><Box sx={{ flex: { xs: "0 0 100%", lg: "0 0 33.333%" }, maxWidth: { xs: "100%", lg: "33.333%" } }}><VTimePicker value={e7} onChange={setE7} format="24hr" /></Box></CenterRow>;
}

function AllowedTimesExample() {
  const [time, setTime] = useState<TimeValue>("11:15");
  const [timeStep, setTimeStep] = useState<TimeValue>("10:10");
  return (
    <CenterRow justify="space-around">
      <Box sx={{ mt: 4 }}><VTimePicker value={time} onChange={setTime} allowedHours={(value) => Boolean(value % 2)} allowedMinutes={(value) => value >= 10 && value <= 50} format="24hr" scrollable min="9:30" max="22:15" /></Box>
      <Box sx={{ mt: 4 }}><VTimePicker value={timeStep} onChange={setTimeStep} allowedMinutes={(value) => value % 10 === 0} format="24hr" /></Box>
    </CenterRow>
  );
}

function WidthExample() {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const [time, setTime] = useState<TimeValue>("11:15");
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Box sx={{ ml: 4 }}><VTimePicker value={time} onChange={setTime} width={290} /></Box>
      <Box sx={{ flex: "1 1 0", p: 0, mx: 4, mt: { xs: 4, sm: 0 }, minWidth: 290 }}><VTimePicker value={time} onChange={setTime} landscape={mdAndUp} fullWidth /></Box>
    </Box>
  );
}

function AmpmTitleExample() {
  const theme = useTheme();
  const landscape = useMediaQuery(theme.breakpoints.up("sm"));
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around" align="center"><VTimePicker value={picker} onChange={setPicker} ampmInTitle /><VTimePicker value={picker} onChange={setPicker} landscape={landscape} ampmInTitle /></CenterRow>;
}

function NoTitleExample() {
  const theme = useTheme();
  const landscape = useMediaQuery(theme.breakpoints.up("sm"));
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around"><VTimePicker value={picker} onChange={setPicker} noTitle /><VTimePicker value={picker} onChange={setPicker} landscape={landscape} noTitle /></CenterRow>;
}

function UseSecondsExample() {
  const theme = useTheme();
  const landscape = useMediaQuery(theme.breakpoints.up("sm"));
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around" align="center"><VTimePicker value={picker} onChange={setPicker} useSeconds /><VTimePicker value={picker} onChange={setPicker} landscape={landscape} useSeconds /></CenterRow>;
}

function ScrollableExample() {
  const [picker, setPicker] = useState<TimeValue>(null);
  return <CenterRow justify="space-around" align="center"><VTimePicker value={picker} onChange={setPicker} scrollable /></CenterRow>;
}

function DialogAndMenuExample() {
  const [time, setTime] = useState<TimeValue>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
      <Box sx={{ flex: { xs: "0 0 91.666%", sm: "0 0 41.666%" }, maxWidth: { xs: "91.666%", sm: "41.666%" }, px: 1.5, position: "relative" }}>
        <TimeField label="Picker in menu" value={time} onClick={() => setMenuOpen(true)} />
        {menuOpen && (
          <>
            <Box sx={{ position: "fixed", inset: 0, zIndex: 19 }} onClick={() => setMenuOpen(false)} />
            <Box sx={{ position: "absolute", left: 40, top: 58, zIndex: 20, width: 290, transformOrigin: "left top", animation: "timePickerScale .18s cubic-bezier(0,0,.2,1)" }}>
              <VTimePicker value={time} onChange={setTime} fullWidth onClickMinute={() => setMenuOpen(false)} />
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flex: { xs: "0 0 91.666%", sm: "0 0 41.666%" }, maxWidth: { xs: "91.666%", sm: "41.666%" }, px: 1.5 }}>
        <TimeField label="Picker in dialog" value={time} onClick={() => setModalOpen(true)} />
        <Dialog open={modalOpen} onClose={() => undefined} PaperProps={{ sx: { width: 290, borderRadius: "4px", overflow: "hidden" } }}>
          <VTimePicker
            value={time}
            onChange={setTime}
            fullWidth
            actions={
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={() => setModalOpen(false)} sx={{ color: primary, textTransform: "uppercase" }}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)} sx={{ color: primary, textTransform: "uppercase" }}>OK</Button>
              </>
            }
          />
        </Dialog>
      </Box>
    </Box>
  );
}

function TimeField({ label, value, onClick }: { label: string; value: TimeValue; onClick: () => void }) {
  return (
    <TextField
      fullWidth
      variant="standard"
      label={label}
      value={value || ""}
      onClick={onClick}
      InputProps={{ readOnly: true, startAdornment: <AccessTime sx={{ mr: 1, color: "rgba(0,0,0,.54)" }} /> }}
    />
  );
}

function RangeExample() {
  const [start, setStart] = useState<TimeValue>(null);
  const [end, setEnd] = useState<TimeValue>(null);
  return (
    <Box>
      <Typography component="h1" sx={{ fontSize: "2em", fontWeight: "bold", my: "0.67em" }}>Plan your event:</Typography>
      <CenterRow justify="space-around" align="center">
        <Box sx={{ width: 290, flex: "0 1 auto" }}>
          <Typography component="h2" sx={{ fontSize: "1.5em", fontWeight: "bold", my: "0.83em" }}>Start:</Typography>
          <VTimePicker value={start} onChange={setStart} max={end} />
        </Box>
        <Box sx={{ width: 290, flex: "0 1 auto" }}>
          <Typography component="h2" sx={{ fontSize: "1.5em", fontWeight: "bold", my: "0.83em" }}>End:</Typography>
          <VTimePicker value={end} onChange={setEnd} min={start} />
        </Box>
      </CenterRow>
    </Box>
  );
}

const examples = [
  { key: "simple/colorable", title: "Colors", description: <>Time picker colors can be set using the <CodePill>color</CodePill> and <CodePill>header-color</CodePill> props. If <CodePill>header-color</CodePill> prop is not provided  header will use the <CodePill>color</CodePill> prop value.</>, render: () => <ColorableExample /> },
  { key: "simple/disabled", title: "Disabled", description: "You can't interact with disabled picker.", render: () => <DisabledExample /> },
  { key: "simple/readonly", title: "Read-only", description: "Read-only picker behaves same as disabled one, but looks like default one.", render: () => <ReadonlyExample /> },
  { key: "simple/24h-format", title: "24h format", description: <>A time picker can be switched to 24hr format. Note that the <CodePill>format</CodePill> prop defines only the way the picker is displayed, picker's value (model) is always in 24hr format.</>, render: () => <Format24Example /> },
  { key: "simple/allowed-times", title: "Allowed times", description: "You can specify allowed times using arrays, objects, and functions. You can also specify time step/precision/interval - e.g. 10 minutes.", render: () => <AllowedTimesExample /> },
  { key: "simple/width", title: "Setting picker width", description: "You can specify allowed the picker's width or make it full width.", render: () => <WidthExample /> },
  { key: "simple/ampm-in-title", title: "AM/PM switch in title", description: "You can move AM/PM switch to picker's title.", render: () => <AmpmTitleExample /> },
  { key: "simple/no-title", title: "No title", description: "You can remove picker's title.", render: () => <NoTitleExample /> },
  { key: "simple/use-seconds", title: "With seconds", description: "Time picker can have seconds input.", render: () => <UseSecondsExample /> },
  { key: "simple/scrollable", title: "Scrollable", description: "You can edit time picker's value using mouse wheel.", render: () => <ScrollableExample /> },
  { key: "intermediate/dialog-and-menu", title: "In dialog and menu", description: "Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.", render: () => <DialogAndMenuExample /> },
  { key: "intermediate/range", title: "Range", description: <>This is an example of joining pickers together using <CodePill>min</CodePill> and <CodePill>max</CodePill> prop.</>, render: () => <RangeExample /> },
] as const;

function TimePickersPage() {
  return (
    <DocPage
      title="TimePickers"
      namespace="Components"
      icon={<AccessTime />}
      breadcrumbs={[
        { label: "Components", href: "/components/vuetify/api-explorer" },
        { label: "Vuetify", href: "/components/vuetify/api-explorer" },
        { label: "Time Pickers" },
      ]}
    >
      <Box
        sx={{
          "@keyframes timePickerScale": {
            from: { opacity: 0, transform: "scale(.85)" },
            to: { opacity: 1, transform: "scale(1)" },
          },
        }}
      />
      <DocText>The <CodePill>v-time-picker</CodePill> is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting the time.</DocText>
      <Box component="section">
        <Typography component="h2" id="usage" sx={{ fontSize: 20, lineHeight: "32px", fontWeight: 400, mb: 2 }}>Usage</Typography>
        <VuetifyExampleBlock title="" source="usage" description="Time pickers have the light theme enabled by default.">
          {() => <UsageExample />}
        </VuetifyExampleBlock>
      </Box>
      {examples.map((example) => (
        <VuetifyExampleBlock key={example.key} title={example.title} description={example.description} source={example.key}>
          {example.render}
        </VuetifyExampleBlock>
      ))}
    </DocPage>
  );
}

const sourceTemplates = {
  usage: `<template>
  <v-row justify="center">
    <v-time-picker v-model="picker"></v-time-picker>
  </v-row>
</template>`,
  "simple/colorable": `<template>
  <v-row justify="space-around">
    <v-time-picker v-model="e4" color="green lighten-1"></v-time-picker>
    <v-time-picker v-model="e4" color="green lighten-1" header-color="primary"></v-time-picker>
  </v-row>
</template>`,
  "simple/disabled": `<v-time-picker v-model="picker" disabled></v-time-picker>
<v-time-picker v-model="picker" :landscape="$vuetify.breakpoint.smAndUp" disabled></v-time-picker>`,
  "simple/readonly": `<v-time-picker v-model="picker" readonly></v-time-picker>
<v-time-picker v-model="picker" :landscape="$vuetify.breakpoint.smAndUp" readonly></v-time-picker>`,
  "simple/24h-format": `<v-time-picker v-model="e7" format="24hr"></v-time-picker>`,
  "simple/allowed-times": `<v-time-picker v-model="time" :allowed-hours="allowedHours" :allowed-minutes="allowedMinutes" class="mt-4" format="24hr" scrollable min="9:30" max="22:15"></v-time-picker>
<v-time-picker v-model="timeStep" :allowed-minutes="allowedStep" class="mt-4" format="24hr"></v-time-picker>`,
  "simple/width": `<v-time-picker v-model="time" type="month" width="290" class="ml-4"></v-time-picker>
<v-time-picker v-model="time" :landscape="$vuetify.breakpoint.mdAndUp" full-width type="month"></v-time-picker>`,
  "simple/ampm-in-title": `<v-time-picker v-model="picker" ampm-in-title></v-time-picker>
<v-time-picker v-model="picker" :landscape="$vuetify.breakpoint.smAndUp" ampm-in-title></v-time-picker>`,
  "simple/no-title": `<v-time-picker v-model="picker" no-title></v-time-picker>
<v-time-picker v-model="picker" :landscape="$vuetify.breakpoint.smAndUp" no-title></v-time-picker>`,
  "simple/use-seconds": `<v-time-picker v-model="picker" use-seconds></v-time-picker>
<v-time-picker v-model="picker" :landscape="$vuetify.breakpoint.smAndUp" use-seconds></v-time-picker>`,
  "simple/scrollable": `<v-time-picker v-model="picker" scrollable></v-time-picker>`,
  "intermediate/dialog-and-menu": `<v-menu :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
  <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
</v-menu>
<v-dialog :return-value.sync="time" persistent width="290px">
  <v-time-picker v-if="modal2" v-model="time" full-width>
    <v-btn text color="primary">Cancel</v-btn>
    <v-btn text color="primary">OK</v-btn>
  </v-time-picker>
</v-dialog>`,
  "intermediate/range": `<h1>Plan your event:</h1>
<v-time-picker v-model="start" :max="end"></v-time-picker>
<v-time-picker v-model="end" :min="start"></v-time-picker>`,
};

export default TimePickersPage;

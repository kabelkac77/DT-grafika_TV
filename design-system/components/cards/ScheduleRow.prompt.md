One row of a race-day schedule table; stack several inside a bordered wrapper.

```jsx
<div style={{border:'1px solid var(--svdt-border)',borderRadius:10,overflow:'hidden',background:'var(--svdt-bg-card)'}}>
  <ScheduleRow time="09:00" title="Otevření depa" detail="Registrace" status="done" />
  <ScheduleRow time="15:00" title="Hlavní závod — start" detail="Elite muži" status="live" now />
</div>
```

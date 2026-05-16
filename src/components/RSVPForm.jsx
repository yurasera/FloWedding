import { useMemo, useState } from "react";
import { buildWhatsAppUrl } from "../utils/date.js";

function getStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export default function RSVPForm({ whatsappNumber, recipientName, coupleName, eventDateText }) {
  const storageKey = "flo_wedding_rsvp";
  const initial = useMemo(
    () =>
      getStorage(storageKey, {
        name: "",
        attendance: "hadir",
        guests: 1,
        message: "",
      }),
    [],
  );

  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);

  const onChange = (patch) => {
    setSaved(false);
    setForm((v) => ({ ...v, ...patch }));
  };

  const onSave = () => {
    const cleaned = {
      ...form,
      guests: Math.max(1, Math.min(10, Number(form.guests) || 1)),
      name: String(form.name || "").trim(),
      message: String(form.message || "").trim(),
    };
    setStorage(storageKey, cleaned);
    setForm(cleaned);
    setSaved(true);
  };

  const whatsappText = [
    `Halo ${recipientName}, saya ${form.name || "(nama)"} ingin RSVP.`,
    `Status: ${form.attendance === "hadir" ? "Hadir" : "Tidak bisa hadir"}.`,
    `Jumlah tamu: ${form.guests}.`,
    form.message ? `Pesan: ${form.message}` : null,
    "",
    `Acara: ${coupleName} — ${eventDateText}`,
  ]
    .filter(Boolean)
    .join("\n");

  const waUrl = buildWhatsAppUrl(whatsappNumber, whatsappText);

  return (
    <div className="card">
      <div className="card-title">RSVP</div>
      <div className="grid2">
        <label className="field">
          <div className="label">Nama</div>
          <input
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Nama Anda"
            autoComplete="name"
          />
        </label>
        <label className="field">
          <div className="label">Jumlah tamu</div>
          <input
            type="number"
            min={1}
            max={10}
            value={form.guests}
            onChange={(e) => onChange({ guests: e.target.value })}
          />
        </label>
      </div>

      <div className="grid2">
        <label className="field">
          <div className="label">Kehadiran</div>
          <select value={form.attendance} onChange={(e) => onChange({ attendance: e.target.value })}>
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak bisa hadir</option>
          </select>
        </label>
        <div className="field">
          <div className="label">Kirim</div>
          <div className="row">
            <button className="btn" onClick={onSave}>
              Simpan
            </button>
            <a className="btn btn-primary" href={waUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          {saved ? <div className="hint ok">Tersimpan di perangkat Anda.</div> : null}
        </div>
      </div>

      <label className="field">
        <div className="label">Ucapan</div>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="Tulis ucapan singkat…"
        />
      </label>
    </div>
  );
}


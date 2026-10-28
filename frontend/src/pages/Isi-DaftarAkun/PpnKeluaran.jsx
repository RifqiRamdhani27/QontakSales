import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dompetBiru from "../../assets/dompetbiru.png";

const DAFTAR_AKUN_PATH = "/daftar-akun";

const LINK = "#4169e1";
const PRIMARY = "#3858c7";
const PRIMARY_HOVER = "#2f4cb0";
const BORDER = "#d1d5db";

function ChevronDownIcon() {
  return (
    <svg style={{ width: "14px", height: "14px", color: "#3b5cb8", fill: "currentColor" }} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      />
    </svg>
  );
}

function OutlineButton({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
        height: "34px", padding: "0 14px", fontSize: "13px", fontWeight: 500, color: "#3b5cb8",
        backgroundColor: hover ? "#f8fafc" : "#ffffff",
        border: `1px solid ${hover ? "#9ca3af" : BORDER}`, borderRadius: "4px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)", cursor: "pointer",
        transition: "all 0.15s ease-in-out", fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

export default function PPNKeluaran() {
  const navigate = useNavigate();
  const [showHover, setShowHover] = useState(false);
  const [crumbHover, setCrumbHover] = useState(false);

  // --- State Kalender Tanggal Awal ---
  const startDatePickerRef = useRef(null);
  // Dikosongkan (null) di awal agar placeholder "Tanggal awal" muncul
  const [startSelectedDate, setStartSelectedDate] = useState(null); 
  const [startCalendarViewDate, setStartCalendarViewDate] = useState(() => new Date(2026, 8, 16));
  const [startCalendarViewMode, setStartCalendarViewMode] = useState("days");
  const [startYearRangeStart, setStartYearRangeStart] = useState(() => Math.floor(2026 / 12) * 12);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [startDate, setStartDate] = useState("");

  // --- State Kalender Tanggal Akhir ---
  const endDatePickerRef = useRef(null);
  // Dikosongkan (null) di awal agar placeholder "Tanggal akhir" muncul
  const [endSelectedDate, setEndSelectedDate] = useState(null);
  const [endCalendarViewDate, setEndCalendarViewDate] = useState(() => new Date(2026, 8, 16));
  const [endCalendarViewMode, setEndCalendarViewMode] = useState("days");
  const [endYearRangeStart, setEndYearRangeStart] = useState(() => Math.floor(2026 / 12) * 12);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [endDate, setEndDate] = useState("");

  const MONTH_NAMES = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const formatDateDDMMYYYY = (date) => {
    if (!date) return "";
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => { setStartDate(formatDateDDMMYYYY(startSelectedDate)); }, [startSelectedDate]);
  useEffect(() => { setEndDate(formatDateDDMMYYYY(endSelectedDate)); }, [endSelectedDate]);

  // Handle click outside untuk menutup kalender
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startDatePickerRef.current && !startDatePickerRef.current.contains(event.target)) setShowStartCalendar(false);
      if (endDatePickerRef.current && !endDatePickerRef.current.contains(event.target)) setShowEndCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, month: month - 1, year: month === 0 ? year - 1 : year, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, month, year, isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, month: month + 1, year: month === 11 ? year + 1 : year, isCurrentMonth: false });
    }
    return days;
  };

  const renderCalendarPopover = (
    viewDate, setViewDate, viewMode, setViewMode, yearRangeStart, setYearRangeStart, selectedDate, onSelectDate, alignRight = false
  ) => (
    <div style={{
      position: "absolute", top: "calc(100% + 4px)",
      ...(alignRight ? { right: 0 } : { left: 0 }),
      zIndex: 1000,
      backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      padding: "16px", width: "280px", userSelect: "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <button type="button" style={{ background: "none", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "#334155", padding: "4px 8px", borderRadius: "4px" }}
          onClick={(e) => { e.stopPropagation(); if (viewMode === "days") setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); else if (viewMode === "months") setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1)); else setYearRangeStart(p => p - 12); }}>«</button>
        <button type="button" style={{ background: "none", border: "none", fontSize: "14px", fontWeight: "700", color: "#4f67c9", cursor: "pointer", padding: "4px 8px" }}
          onClick={(e) => { e.stopPropagation(); if (viewMode === "days") setViewMode("months"); else if (viewMode === "months") setViewMode("years"); }}>
          {viewMode === "days" && `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
          {viewMode === "months" && `${viewDate.getFullYear()}`}
          {viewMode === "years" && `${yearRangeStart} - ${yearRangeStart + 11}`}
        </button>
        <button type="button" style={{ background: "none", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", color: "#334155", padding: "4px 8px", borderRadius: "4px" }}
          onClick={(e) => { e.stopPropagation(); if (viewMode === "days") setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); else if (viewMode === "months") setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1)); else setYearRangeStart(p => p + 12); }}>»</button>
      </div>
      {viewMode === "days" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "600", fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>
            <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", textAlign: "center", fontSize: "12px" }}>
            {getCalendarDays(viewDate.getFullYear(), viewDate.getMonth()).map((d, idx) => {
              const isSelected = selectedDate && d.day === selectedDate.getDate() && d.month === selectedDate.getMonth() && d.year === selectedDate.getFullYear();
              return (
                <button key={idx} type="button" onClick={(e) => { e.stopPropagation(); onSelectDate(new Date(d.year, d.month, d.day)); }}
                  style={{ padding: "6px 0", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: isSelected ? "#4f67c9" : "transparent", color: isSelected ? "#ffffff" : d.isCurrentMonth ? "#1e293b" : "#94a3b8", fontWeight: isSelected ? "bold" : "normal" }}>
                  {d.day}
                </button>
              );
            })}
          </div>
        </>
      )}
      {viewMode === "months" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", textAlign: "center", fontSize: "12px", paddingTop: "8px" }}>
          {MONTH_NAMES.map((mName, idx) => (
            <button key={mName} type="button" onClick={(e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), idx, 1)); setViewMode("days"); }}
              style={{ padding: "10px 4px", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: viewDate.getMonth() === idx ? "#4f67c9" : "#f8fafc", color: viewDate.getMonth() === idx ? "#ffffff" : "#1e293b", fontWeight: viewDate.getMonth() === idx ? "bold" : "normal" }}>
              {mName.substring(0, 3)}
            </button>
          ))}
        </div>
      )}
      {viewMode === "years" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", textAlign: "center", fontSize: "12px", paddingTop: "8px" }}>
          {Array.from({ length: 12 }, (_, i) => yearRangeStart + i).map((yr) => (
            <button key={yr} type="button" onClick={(e) => { e.stopPropagation(); setViewDate(new Date(yr, viewDate.getMonth(), 1)); setViewMode("days"); }}
              style={{ padding: "10px 4px", border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor: viewDate.getFullYear() === yr ? "#4f67c9" : "#f8fafc", color: viewDate.getFullYear() === yr ? "#ffffff" : "#1e293b", fontWeight: viewDate.getFullYear() === yr ? "bold" : "normal" }}>
              {yr}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", 
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ width: "100%", boxSizing: "border-box", 
        backgroundColor: "#ffffff", 
        padding: "20px 32px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate(DAFTAR_AKUN_PATH); }}
              onMouseEnter={() => setCrumbHover(true)}
              onMouseLeave={() => setCrumbHover(false)}
              style={{ fontSize: "13px", color: LINK, marginBottom: "4px", display: "inline-block", textDecoration: crumbHover ? "underline" : "none" }}
            >
              Daftar akun
            </a>
            <h1 style={{ fontSize: "23px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.025em", lineHeight: 1, margin: 0 }}>
              (2-20500) - PPN Keluaran
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <OutlineButton>Beri masukan</OutlineButton>
            <OutlineButton>
              <span>Tindakan</span>
              <ChevronDownIcon />
            </OutlineButton>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ width: "100%", boxSizing: "border-box", flex: 1, display: "flex", flexDirection: "column", padding: "20px 32px 48px", maxWidth: "1600px", margin: "0 auto" }}>
        {/* Filter bar */}
        <section style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "28px", fontSize: "13px", lineHeight: "20px" }}>
            <span style={{ color: "#64748b" }}>Kategori akun</span>
            <span style={{ color: "#334155", fontWeight: 500 }}>Liabilitas Jangka Pendek</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            
            {/* Tanggal Awal Custom Calendar */}
            <div style={{ position: "relative" }} ref={startDatePickerRef}>
              <div
                onClick={() => setShowStartCalendar(!showStartCalendar)}
                style={{
                  height: "36px", width: "165px", backgroundColor: "#ffffff", border: `1px solid ${BORDER}`,
                  borderRadius: "4px", padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ fontSize: "13px", color: startDate ? "#1e293b" : "#64748b" }}>
                  {startDate || "Tanggal awal"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              {showStartCalendar && renderCalendarPopover(
                startCalendarViewDate, setStartCalendarViewDate,
                startCalendarViewMode, setStartCalendarViewMode,
                startYearRangeStart, setStartYearRangeStart,
                startSelectedDate,
                (date) => { setStartSelectedDate(date); setShowStartCalendar(false); }
              )}
            </div>

            {/* Tanggal Akhir Custom Calendar */}
            <div style={{ position: "relative" }} ref={endDatePickerRef}>
              <div
                onClick={() => setShowEndCalendar(!showEndCalendar)}
                style={{
                  height: "36px", width: "165px", backgroundColor: "#ffffff", border: `1px solid ${BORDER}`,
                  borderRadius: "4px", padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ fontSize: "13px", color: endDate ? "#1e293b" : "#64748b" }}>
                  {endDate || "Tanggal akhir"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              {showEndCalendar && renderCalendarPopover(
                endCalendarViewDate, setEndCalendarViewDate,
                endCalendarViewMode, setEndCalendarViewMode,
                endYearRangeStart, setEndYearRangeStart,
                endSelectedDate,
                (date) => { setEndSelectedDate(date); setShowEndCalendar(false); },
                true
              )}
            </div>
            
            <button
              type="button"
              onMouseEnter={() => setShowHover(true)}
              onMouseLeave={() => setShowHover(false)}
              style={{
                height: "36px", padding: "0 16px", backgroundColor: showHover ? PRIMARY_HOVER : PRIMARY, color: "#ffffff",
                fontSize: "13.5px", fontWeight: 500, border: "none", borderRadius: "4px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                cursor: "pointer", transition: "background-color 0.15s ease", fontFamily: "inherit",
              }}
            >
              Tampilkan
            </button>
          </div>
        </section>

        {/* Empty state */}
        <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "96px 0 112px", textAlign: "center" }}>
          <img
            src={dompetBiru}
            alt="Belum ada transaksi"
            draggable={false}
            style={{ width: "220px", maxWidth: "100%", height: "auto", marginBottom: "12px", userSelect: "none" }}
          />
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px 0" }}>
            Belum ada transaksi
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, fontWeight: 400, margin: 0 }}>
            Daftar transaksi Anda akan ditampilkan di sini.
          </p>
        </div>
      </main>
    </div>
  );
}
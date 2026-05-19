import { useCallback, useState } from "react";
import Modal from "./components/Modal.jsx";
import { invitation } from "./data/invitation.js";
import { buildICS } from "./utils/date.js";
import { useScrollLock } from "./hooks/useScrollLock.js";
import { useInvitationMeta } from "./hooks/useInvitationMeta.js";
import CoverHeader from "./sections/CoverHeader.jsx";
import TopNav from "./sections/TopNav.jsx";
import CoupleSection from "./sections/CoupleSection.jsx";
import EventSection from "./sections/EventSection.jsx";
import StorySection from "./sections/StorySection.jsx";
import RsvpSection from "./sections/RsvpSection.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const { guestName, coupleName, start, dateText } = useInvitationMeta(invitation);
  useScrollLock(!opened);

  const onDownloadICS = useCallback(() => {
    const ics = buildICS({
      title: `Pernikahan ${coupleName}`,
      description: `Undangan pernikahan ${coupleName}.`,
      location: `${invitation.event.locationName} — ${invitation.event.locationAddress}`,
      start: invitation.event.startISO,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `undangan-${coupleName.replace(/\s+/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [coupleName]);

  return (
    <div className="layout" id="top">
      <aside className="layout-left" aria-hidden="true">
        <div className="layout-left__inner">
          <div className="layout-left__label">Wedding Invitation</div>
          <div className="layout-left__names">
            <div className="layout-left__name">{invitation.couple.groom.name}</div>
            <div className="layout-left__amp">&amp;</div>
            <div className="layout-left__name">{invitation.couple.bride.name}</div>
          </div>
        </div>
      </aside>

      <div className="layout-right">
        <div className="layout-phone">
          <div className="app">
            <CoverHeader
              opened={opened}
              coupleName={coupleName}
              dateText={dateText}
              startISO={invitation.event.startISO}
              locationName={invitation.event.locationName}
              guestName={guestName}
              onOpen={() => setOpened(true)}
            />

            <main className={`content ${opened ? "is-open" : ""}`}>
              <TopNav coupleName={coupleName} />
              <CoupleSection invitation={invitation} guestName={guestName} start={start} />
              <EventSection
                invitation={invitation}
                start={start}
                onOpenCalendar={() => setOpenCalendar(true)}
              />
              <StorySection story={invitation.story} />
              <RsvpSection invitation={invitation} coupleName={coupleName} dateText={dateText} />
              <Footer coupleName={coupleName} />
            </main>

            <Modal open={openCalendar} title="Simpan ke Kalender" onClose={() => setOpenCalendar(false)}>
              <div className="text">
                Unduh file kalender (.ics) lalu buka dengan aplikasi kalender Anda.
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <button className="btn btn-primary" onClick={onDownloadICS}>
                  Download .ics
                </button>
                <button className="btn" onClick={() => setOpenCalendar(false)}>
                  Tutup
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

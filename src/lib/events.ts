import { getCollection } from 'astro:content';

const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const dayAbbrevs = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

export interface ExpandedEvent {
  id: string;
  slug: string;
  data: {
    title: string;
    date: Date;
    endDate?: Date;
    time?: string;
    location?: string;
    description: string;
    image?: string;
    link?: string;
    recurring: 'none' | 'settimanale';
  };
  isRecurring: boolean;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

/** Expand recurring events into individual occurrences */
function expandRecurringEvents(events: any[], weeksAhead = 4): ExpandedEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const expanded: ExpandedEvent[] = [];

  for (const event of events) {
    if (event.data.recurring === 'settimanale') {
      const originalDate = new Date(event.data.date);
      const dayOfWeek = originalDate.getDay();

      for (let week = 0; week < weeksAhead; week++) {
        const nextDate = new Date(now);
        const daysUntil = (dayOfWeek - now.getDay() + 7) % 7;
        nextDate.setDate(now.getDate() + daysUntil + (week * 7));
        nextDate.setHours(0, 0, 0, 0);

        expanded.push({
          id: `${event.id}-week-${week}`,
          slug: event.id,
          data: { ...event.data, date: nextDate },
          isRecurring: true,
        });
      }
    } else {
      const eventDate = new Date(event.data.date);
      if (eventDate >= now || isSameDay(eventDate, now)) {
        expanded.push({
          id: event.id,
          slug: event.id,
          data: event.data,
          isRecurring: false,
        });
      }
    }
  }

  return expanded;
}

/** Get all events (recurring expanded) sorted chronologically */
export async function getExpandedEvents(weeksAhead = 8): Promise<ExpandedEvent[]> {
  const allEvents = await getCollection('eventi');
  return expandRecurringEvents(allEvents, weeksAhead)
    .sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());
}

/** Get recurring events schedule (for footer, contatti, chi-siamo) */
export async function getRecurringSchedule() {
  const allEvents = await getCollection('eventi');
  const recurring = allEvents.filter(e => e.data.recurring === 'settimanale');

  return recurring
    .sort((a, b) => new Date(a.data.date).getDay() - new Date(b.data.date).getDay())
    .map(e => {
      const d = new Date(e.data.date);
      return {
        title: e.data.title,
        day: dayNames[d.getDay()],
        dayAbbrev: dayAbbrevs[d.getDay()],
        time: e.data.time || '',
        slug: e.id,
      };
    });
}

/** Get next N upcoming events */
export async function getUpcomingEvents(n: number): Promise<ExpandedEvent[]> {
  const expanded = await getExpandedEvents();
  return expanded.slice(0, n);
}

/** Generate schedule text like "ogni domenica alle 10:00, ogni mercoledì alle 18:00" */
export async function getScheduleText(): Promise<string> {
  const schedule = await getRecurringSchedule();
  if (schedule.length === 0) return '';

  const parts = schedule.map(s => `ogni ${s.day.toLowerCase()} alle ${s.time}`);
  if (parts.length === 1) return parts[0];
  return parts.slice(0, -1).join(', ') + ' e ' + parts[parts.length - 1];
}

/** Build calendar grid data for a given month */
export function buildCalendarMonth(year: number, month: number, events: ExpandedEvent[]) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday = 0, Sunday = 6 (European week)
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(firstDay);

  const weeks: { day: number | null; events: ExpandedEvent[] }[][] = [];
  let currentWeek: { day: number | null; events: ExpandedEvent[] }[] = [];

  // Fill leading empty cells
  for (let i = 0; i < startDow; i++) {
    currentWeek.push({ day: null, events: [] });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayEvents = events.filter(e => {
      const ed = new Date(e.data.date);
      return ed.getFullYear() === year && ed.getMonth() === month && ed.getDate() === d;
    });
    currentWeek.push({ day: d, events: dayEvents });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing empty cells
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ day: null, events: [] });
    }
    weeks.push(currentWeek);
  }

  return { year, month, monthName, weeks };
}

/** Get color class for event dot based on title */
export function getEventDotColor(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('holyday')) return 'bg-violet-500';
  if (t.includes('culto')) return 'bg-emerald-500';
  return 'bg-accent';
}

export { dayNames, dayAbbrevs };

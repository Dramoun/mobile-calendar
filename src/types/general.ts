export type CalendarItemType = "event" | "note";

export type TagType = "birthday" | "national_holiday";

export interface CalendarItemFormat {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime?: string;
  type: CalendarItemType;
  createAt: Date;
  updatedAt?: Date;
  tags?: TagType[];
  itemColor?: string;
}

export interface ReminderItemFormat {
  id: string;
  itemId: string;
  offsetMinites: number;
  notificationId: string;
}


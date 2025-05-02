/**
 * Types for the Players API based on mw.json structure and sub-events.json
 */

// SubEvent interface based on sub-events.json
export interface SubEvent {
  subEventId: number;
  subEventName: string;
  subEventDesc: string | null;
  isActive: boolean;
  isDeleted: boolean;
  isOptional: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  waitingListAllowed: boolean;
  eventId: number;
  subEventCode: string; // MS, WS, MD, WD, XD
  numberOfTotalMatches: number;
  subEventDrawTypeId: string;
  gender: string; // M, W, X
}

// Participant interface based on the provided schema
export interface Participant {
  EventId: number;
  SubEventId: number;
  SubEventCode: string; // e.g., "MS" for Men's Singles
  SubEventAgeCategory: string; // e.g., "SEN" for Senior
  ittfid: string;
  birthDate: string;
  PlayerGivenName: string;
  PlayerFamilyName: string;
  IndividualName: string;
  OrgCode: string; // Country code
  Status: string; // e.g., "Confirmed"
  Seed: number;
  CurrentRanking: number;
  CurrentRankingPoints: number;
  CancellationPastFinalDeadline: boolean;
  ProtectedRanking: number | null;
  Penalized: boolean | null;
  ApplyZeroPointPenalty: boolean;
  IsDoubleEntry: boolean | null;
  TeamName: string | null;
  TeamNumber: number | null;
  TournamentPlayersGroupId: number | null;
  EntryDrawName: string; // e.g., "Main Draw"
  EntryQuotaType: string; // e.g., "AER"
  GenderValue: string; // "M" or "F"
}

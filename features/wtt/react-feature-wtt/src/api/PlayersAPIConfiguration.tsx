import { TypeDescriptor } from '@vyuh/react-core';
import { APIConfiguration } from '@vyuh/react-feature-system';
import React from 'react';
import { PlayersGrid } from './components/PlayersGrid';
import { AllPlayer, AllPlayersResponse, Participant, SubEvent } from './types';

interface PlayerData {
  eventId: string;
  subEvents: SubEvent[];
  profilePics: Record<string, string>;
}
/**
 * Players API Configuration class
 *
 * This class is responsible for handling the Players API configuration
 * and rendering the Players Table component.
 */
export class PlayersAPIConfiguration extends APIConfiguration<PlayerData> {
  static readonly schemaName: string = 'wtt.apiConfig.playersTable';
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly eventId: string;
  readonly enabledCategories: string[];

  constructor(props?: Partial<PlayersAPIConfiguration>) {
    super({
      schemaType: PlayersAPIConfiguration.schemaName,
      title: 'Players API Configuration',
    });

    this.eventId = props?.eventId || '';
    this.enabledCategories = props?.enabledCategories || [
      'all_players',
      'mens_singles',
      'womens_singles',
    ];
  }

  /**
   * Invoke the API with the given configuration
   *
   * This method is responsible for fetching data from the API
   * based on the configuration provided.
   *
   * @returns The data fetched from the API
   */
  override async invoke(): Promise<PlayerData> {
    try {
      // API endpoints for reference:
      // Get Sub Events: https://wttapigateway-new.azure-api.net/prod/api/cms/GetAllLiveOrActiveSubEventsDetails/2932
      // Get Players for Sub-Event: https://wttapigateway-new.azure-api.net/prod/api/cms/GetPlayerEntriesforEventBySubEventId_WithParticDetails/2932/3187
      // Player Profile Pics: https://wttapigateway-new.azure-api.net/prod/api/cms/GetAllPlayerProfilePics
      // All Players API: https://tabletennisapitest.azurewebsites.net/Players/GetPlayers

      // Convert the mock data to the SubEvent type
      const subEvents = (await import('./mock/sub-events.json').then(
        (res) => res.default,
      )) as SubEvent[];

      // Add the AllPlayers sub-event
      const allPlayersSubEvent: SubEvent = {
        subEventId: 9999, // Using a unique ID
        subEventName: 'All Players',
        subEventDesc: null,
        isActive: true,
        isDeleted: false,
        isOptional: false,
        minTeamSize: 0,
        maxTeamSize: 0,
        waitingListAllowed: false,
        eventId: parseInt(this.eventId) || 6767,
        subEventCode: 'ALL',
        numberOfTotalMatches: 0,
        subEventDrawTypeId: '0',
        gender: 'A', // A for All
      };

      // Add the AllPlayers sub-event to the beginning of the array
      const updatedSubEvents = [allPlayersSubEvent, ...subEvents];

      const playerProfilePics = await import(
        './mock/player-headshots.json'
      ).then((res) => res.default);

      return {
        subEvents: updatedSubEvents,
        profilePics: playerProfilePics.reduce(
          (obj, item) => {
            obj[item.ittfid] = item.headShot;
            return obj;
          },
          {} as Record<string, string>,
        ),
        eventId: this.eventId,
      };
    } catch (error) {
      console.error('Error invoking Players API:', error);
      throw error;
    }
  }

  /**
   * Fetch data from the AllPlayers API
   *
   * @returns Promise with the API response
   */
  private async fetchAllPlayersApi(): Promise<AllPlayersResponse> {
    const apiUrl = 'https://tabletennisapitest.azurewebsites.net/Players/GetPlayers';
    const apiKey = '22CE0455-1351-4E85-B815-28F90986EB20';

    console.log("Starting API request to fetch players...");

    // Fetch players from the API with a 30 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const playersResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "ApiKey": apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log("API response status:", playersResponse.status);

      if (!playersResponse.ok) {
        throw new Error(`API request failed with status ${playersResponse.status}`);
      }

      const playersData = await playersResponse.json();
      console.log("Players API Response:", playersData);

      // Convert the API response to our expected format
      return {
        players: Array.isArray(playersData.Result) ? playersData.Result.map((player: any) => ({
          id: player.id || player.Id || String(player.PlayerId) || '',
          firstName: player.FirstName || player.firstName || player.PlayerGivenName || '',
          lastName: player.LastName || player.lastName || player.PlayerFamilyName || '',
          country: player.Country || player.country || player.OrgCode || '',
          ranking: player.Ranking || player.ranking || player.CurrentRanking || 0,
          points: player.Points || player.points || player.CurrentRankingPoints || 0,
          gender: player.Gender || player.gender || player.GenderValue || 'M'
        })) : []
      };
    } catch (error) {
      console.error('Error fetching from AllPlayers API:', error);

      // Clear the timeout if it's still active
      clearTimeout(timeoutId);

      // Check if it's an abort error (timeout) or any other error
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('API request timed out after 30 seconds');
      }

      console.log("Loading fallback data from all-players.json");

      // Load the mock data as a fallback
      try {
        const mockData = await import('./mock/all-players.json').then(res => res.default);

        // Convert the mock data to the expected format
        return {
          players: Array.isArray(mockData.Result) ? mockData.Result.map((player: any) => ({
            id: player.IttfId || '',
            firstName: player.PlayerGivenName || '',
            lastName: player.PlayerFamilyName || '',
            country: player.OrganizationCode || '',
            ranking: parseInt(player.CurrentRanking) || 0,
            points: parseInt(player.CurrentRankingPoints) || 0,
            gender: player.Gender || 'M'
          })) : []
        };
      } catch (mockError) {
        console.error('Error loading fallback data:', mockError);
        throw mockError;
      }
    }
  }

  /**
   * Convert AllPlayers data to Participant format
   *
   * @param allPlayersResponse The response from the AllPlayers API
   * @returns Array of participants in the standard format
   */
  private convertAllPlayersToParticipants(allPlayersResponse: AllPlayersResponse): Participant[] {
    return allPlayersResponse.players.map((player) => ({
      EventId: 0,
      SubEventId: 9999,
      SubEventCode: 'ALL',
      SubEventAgeCategory: 'SEN',
      ittfid: player.id,
      birthDate: '', // Not available in the API
      PlayerGivenName: player.firstName,
      PlayerFamilyName: player.lastName,
      IndividualName: `${player.firstName} ${player.lastName}`,
      OrgCode: player.country,
      Status: 'Confirmed',
      Seed: 0,
      CurrentRanking: player.ranking,
      CurrentRankingPoints: player.points,
      CancellationPastFinalDeadline: false,
      ProtectedRanking: null,
      Penalized: null,
      ApplyZeroPointPenalty: false,
      IsDoubleEntry: null,
      TeamName: null,
      TeamNumber: null,
      TournamentPlayersGroupId: null,
      EntryDrawName: 'All Players',
      EntryQuotaType: 'ALL',
      GenderValue: player.gender,
    }));
  }

  /**
   * Fetch participants for a specific sub-event
   *
   * @param subEventCode The code of the sub-event to fetch participants for
   * @returns Array of participants
   */
  async fetchParticipantsBySubEvent(
    subEventCode: string,
  ): Promise<Participant[]> {
    try {
      // For the ALL sub-event, fetch from the AllPlayers API
      if (subEventCode === 'ALL') {
        // Use our robust API fetching method
        const allPlayersResponse = await this.fetchAllPlayersApi();
        return this.convertAllPlayersToParticipants(allPlayersResponse);
      }

      // For other sub-events, use the existing mock data
      const participants: Record<string, Promise<any>> = {
        MS: import('./mock/MS.json').then((res) => res.default),
        WS: import('./mock/WS.json').then((res) => res.default),
        MD: import('./mock/MD.json').then((res) => res.default),
        WD: import('./mock/WD.json').then((res) => res.default),
        XD: import('./mock/XD.json').then((res) => res.default),
      };

      if (!participants[subEventCode]) {
        throw new Error(`No data available for sub-event code: ${subEventCode}`);
      }

      return await participants[subEventCode];
    } catch (error) {
      console.error(
        `Error fetching participants for sub-event ${subEventCode}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Render the Players Table component with the given configuration and data
   *
   * @param data The data fetched from the API
   * @returns The rendered component
   */
  override build(data: PlayerData): React.ReactNode {
    return (
      <PlayersGrid
        categories={this.enabledCategories}
        profilePics={data.profilePics}
        subEvents={data.subEvents}
        fetchForSubEvent={(subEventCode) =>
          this.fetchParticipantsBySubEvent(subEventCode)
        }
      />
    );
  }
}

import { TypeDescriptor } from '@vyuh/react-core';
import { APIConfiguration } from '@vyuh/react-feature-system';
import React from 'react';
import { PlayersGrid } from './components/PlayersGrid';
import { Participant, SubEvent } from './types';

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

      // Convert the mock data to the SubEvent type
      const subEvents = (await import('./mock/sub-events.json').then(
        (res) => res.default,
      )) as SubEvent[];

      const playerProfilePics = await import(
        './mock/player-headshots.json'
      ).then((res) => res.default);

      return {
        subEvents,
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
   * Fetch participants for a specific sub-event
   *
   * @param subEventId The ID of the sub-event to fetch participants for
   * @returns Array of participants
   */
  async fetchParticipantsBySubEvent(
    subEventCode: string,
  ): Promise<Participant[]> {
    try {
      const participants = {
        MS: import('./mock/MS.json').then((res) => res.default),
        WS: import('./mock/WS.json').then((res) => res.default),
        MD: import('./mock/MD.json').then((res) => res.default),
        WD: import('./mock/WD.json').then((res) => res.default),
        XD: import('./mock/XD.json').then((res) => res.default),
      };

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

import React, { useEffect, useState } from 'react';
import { CategorySelection } from './CategorySelection';
import { DrawSelection } from './DrawSelection';
import { PlayerCard } from './PlayerCard';
import { DoublePlayerCard } from './DoublePlayerCard';
import { Participant, SubEvent } from '../types';
import { getBgColorBaseTextClass } from '../../layouts/components/helper';
import { useWttStore } from '../../utils/store';
import { useTranslation } from '../../i18n';

// Interface for grouped doubles players
interface DoublesTeam {
  player1: Participant;
  player2: Participant;
  teamName: string;
}

// Props for the PlayersTable component
interface PlayersGridProps {
  categories: string[];
  subEvents: SubEvent[];
  profilePics: Record<string, string>;
  fetchForSubEvent?: (subEventCode: string) => Promise<Participant[]>;
}

/**
 * PlayersTable component
 *
 * This component displays a table of players based on the selected sub-event, category, and draw.
 */
export function PlayersGrid({
  categories,
  subEvents,
  profilePics,
  fetchForSubEvent,
}: PlayersGridProps) {
  // State for selected sub-event, category, and draw
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDraw, setSelectedDraw] = useState('');
  const [participantsByDraw, setParticipantsByDraw] = useState<
    Record<string, Participant[]>
  >({});
  const [doublesTeamsByDraw, setDoublesTeamsByDraw] = useState<
    Record<string, DoublesTeam[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDoublesCategory, setIsDoublesCategory] = useState(false);

  // Initialize state in useEffect to avoid hydration mismatch
  useEffect(() => {
    setSelectedCategory(categories[0] || '');
    setSelectedSubEvent(subEvents[0] || null);
  }, [categories, subEvents]);

  const settings = useWttStore((state) => state.settings);
  const colorType = settings?.theme?.toString();
  const currentLanguage = settings?.language || 'en';
  const { t } = useTranslation(currentLanguage);

  // We only need textColorBase for the UI
  const textColorBase = getBgColorBaseTextClass(colorType ?? '');

  // Fetch participants when sub-event or category changes
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!selectedSubEvent || !fetchForSubEvent) return;

      setLoading(true);
      setError(null);

      // Check if this is a doubles category
      const isDoubles = ['MD', 'WD', 'XD'].includes(
        selectedSubEvent.subEventCode,
      );
      setIsDoublesCategory(isDoubles);

      try {
        const data = await fetchForSubEvent(selectedSubEvent.subEventCode);

        if (isDoubles) {
          // For doubles, group participants by team name
          const teamMap = new Map<string, Participant[]>();

          // Group participants by team name
          data.forEach((participant) => {
            if (participant.TeamName) {
              if (!teamMap.has(participant.TeamName)) {
                teamMap.set(participant.TeamName, []);
              }
              teamMap.get(participant.TeamName)?.push(participant);
            }
          });

          // Create doubles teams
          const doublesTeams: DoublesTeam[] = [];
          teamMap.forEach((players, teamName) => {
            // Only create teams with exactly 2 players
            if (players.length === 2) {
              doublesTeams.push({
                player1: players[0],
                player2: players[1],
                teamName,
              });
            }
          });

          // Group doubles teams by draw name
          const groupedTeams = doublesTeams.reduce(
            (acc, team) => {
              const drawName = team.player1.EntryDrawName;
              if (!acc[drawName]) {
                acc[drawName] = [];
              }
              acc[drawName].push(team);
              return acc;
            },
            {} as Record<string, DoublesTeam[]>,
          );

          // Sort teams within each draw by world ranking
          Object.keys(groupedTeams).forEach((drawName) => {
            groupedTeams[drawName].sort((a, b) => {
              // Sort by CurrentRanking of player1 (lower number is better)
              if (!a.player1.CurrentRanking && !b.player1.CurrentRanking)
                return 0;
              if (!a.player1.CurrentRanking) return 1;
              if (!b.player1.CurrentRanking) return -1;
              return a.player1.CurrentRanking - b.player1.CurrentRanking;
            });
          });

          setDoublesTeamsByDraw(groupedTeams);
          setParticipantsByDraw({});
        } else {
          // For singles, group participants by draw name immediately
          const grouped = data.reduce(
            (acc, participant) => {
              const drawName = participant.EntryDrawName;
              if (!acc[drawName]) {
                acc[drawName] = [];
              }
              acc[drawName].push(participant);
              return acc;
            },
            {} as Record<string, Participant[]>,
          );

          // Sort participants within each draw by world ranking
          Object.keys(grouped).forEach((drawName) => {
            grouped[drawName].sort((a, b) => {
              // Sort by CurrentRanking (lower number is better)
              if (!a.CurrentRanking && !b.CurrentRanking) return 0;
              if (!a.CurrentRanking) return 1;
              if (!b.CurrentRanking) return -1;
              return a.CurrentRanking - b.CurrentRanking;
            });
          });

          setParticipantsByDraw(grouped);
          setDoublesTeamsByDraw({});
        }
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError('Failed to load participants. Please try again.');
        setParticipantsByDraw({});
        setDoublesTeamsByDraw({});
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [selectedSubEvent, selectedCategory, fetchForSubEvent]);

  // Auto-select the first sub-event based on the selected category
  useEffect(() => {
    // Find a sub-event that matches the selected category
    const matchingSubEvent = subEvents.find((se) => {
      // Map category to subEventCode
      const categoryToSubEventCode: Record<string, string> = {
        all_players: 'ALL',
        mens_singles: 'MS',
        womens_singles: 'WS',
        mens_doubles: 'MD',
        womens_doubles: 'WD',
        mixed_doubles: 'XD',
      };

      const subEventCode = categoryToSubEventCode[selectedCategory];
      return se.subEventCode === subEventCode;
    });

    if (matchingSubEvent) {
      setSelectedSubEvent(matchingSubEvent);
    }
  }, [selectedCategory, subEvents]);

  // Get available draw types from the participants data and prioritize Main Draw
  const availableDraws = isDoublesCategory
    ? Object.keys(doublesTeamsByDraw).sort((a, b) => {
      // Always put "Main Draw" first
      if (a.includes('Main Draw')) return -1;
      if (b.includes('Main Draw')) return 1;
      return a.localeCompare(b);
    })
    : Object.keys(participantsByDraw).sort((a, b) => {
      // Always put "Main Draw" first
      if (a.includes('Main Draw')) return -1;
      if (b.includes('Main Draw')) return 1;
      return a.localeCompare(b);
    });

  // Determine if we should show the draw selection
  const showDrawSelection = availableDraws.length > 1;

  // Update selected draw when available draws change
  useEffect(() => {
    // If there are available draws, select the first one (which should be Main Draw if available)
    if (
      availableDraws.length > 0 &&
      (selectedDraw === '' || !availableDraws.includes(selectedDraw))
    ) {
      setSelectedDraw(availableDraws[0]);
    }
  }, [availableDraws, selectedDraw]);

  return (
    <div>
      {/* Sub-Event, Category, and Draw Selection */}
      <div className="wtt:flex wtt:gap-4 wtt:mb-0 wtt:flex-wrap">
        {/* Category Selection Component */}
        <div className="wtt:w-full">
          <CategorySelection
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            textColorBase={textColorBase}
          />
        </div>

        {/* Draw Selection Component - Only show if there are multiple draw types */}
        {showDrawSelection && (
          <div className="wtt:w-full">
            <DrawSelection
              selectedDraw={selectedDraw}
              onDrawChange={setSelectedDraw}
              availableDraws={availableDraws}
              textColorBase={textColorBase}
            />
          </div>
        )}
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="wtt:text-center wtt:py-8 wtt:text-gray-500">
          <div className="wtt:animate-spin wtt:rounded-full wtt:h-8 wtt:w-8 wtt:border-t-2 wtt:border-b-2 wtt:border-blue-500 wtt:mx-auto wtt:mb-4"></div>
          <p className="wtt:mb-2">{t('players.loadingParticipants')}</p>
          <p className="wtt:text-sm wtt:text-gray-400">{t('players.loadingTimeEstimate')}</p>
        </div>
      )}

      {error && (
        <div className="wtt:text-center wtt:py-4 wtt:text-red-500 wtt:bg-red-50 wtt:rounded wtt:p-4 wtt:mb-4">
          {t('players.errorLoadingParticipants')}
        </div>
      )}

      {/* Participants Grid */}
      {!loading && !error && (
        <div>
          {/* Display the selected draw with its participants */}
          {availableDraws.length > 0 ? (
            <div>
              {availableDraws.map((drawName) => {
                // Only show the selected draw when multiple draws are available
                if (showDrawSelection && drawName !== selectedDraw) return null;

                if (isDoublesCategory) {
                  // Handle doubles teams
                  const drawTeams = doublesTeamsByDraw[drawName] || [];

                  return (
                    <div key={drawName} className="wtt:mb-8">
                      <div className="wtt:mb-4 wtt:mt-4 wtt:border-b wtt:border-gray-200"></div>

                      {drawTeams.length > 0 ? (
                        <div className="wtt:grid wtt:grid-cols-1 wtt:gap-4 wtt:xs:grid-cols-1 wtt:sm:grid-cols-2 wtt:md:grid-cols-2 wtt:lg:grid-cols-3 wtt:xl:grid-cols-4 wtt:2xl:grid-cols-5">
                          {drawTeams.map((team) => (
                            <DoublePlayerCard
                              key={team.teamName}
                              player1={team.player1}
                              player2={team.player2}
                              photoUrl1={profilePics[team.player1.ittfid]}
                              photoUrl2={profilePics[team.player2.ittfid]}
                              teamName={team.teamName}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="wtt:text-center wtt:py-4 wtt:text-gray-500">
                          {t('players.noTeamsFound')} {drawName}.
                        </div>
                      )}
                    </div>
                  );
                } else {
                  // Handle singles players
                  const drawParticipants = participantsByDraw[drawName] || [];

                  return (
                    <div key={drawName} className="wtt:mb-8">
                      <div className="wtt:mb-4 wtt:mt-4 wtt:border-b wtt:border-gray-200"></div>

                      {drawParticipants.length > 0 ? (
                        <div className="wtt:grid wtt:grid-cols-1 wtt:gap-4 wtt:xs:grid-cols-1 wtt:sm:grid-cols-2 wtt:md:grid-cols-2 wtt:lg:grid-cols-3 wtt:xl:grid-cols-4 wtt:2xl:grid-cols-5">
                          {drawParticipants.map((participant) => (
                            <PlayerCard
                              key={participant.ittfid}
                              participant={participant}
                              photoUrl={profilePics[participant.ittfid]}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="wtt:text-center wtt:py-4 wtt:text-gray-500">
                          {t('players.noParticipantsFound')} {drawName}.
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="wtt:text-center wtt:py-4 wtt:text-gray-500">
              {isDoublesCategory ? t('players.noTeamsFoundFor') : t('players.noParticipantsFoundFor')}{' '}
              {selectedSubEvent?.subEventName}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
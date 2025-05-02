import React, { useEffect } from 'react';
import { Participant } from '../types';
import { getBgColorClass, getTextColorClass, getTextColorFontClass } from '../../layouts/components/helper';
import { useWttStore } from '../../utils/store';

interface PlayerCardProps {
  participant: Participant;
  photoUrl?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  participant,
  photoUrl,
}) => {
  const playerProfileUrl = `https://worldtabletennis.com/playerDescription?playerId=${participant.ittfid}`;

  const handleCardClick = () => {
    window.open(playerProfileUrl, '_blank');
  };



  useEffect(() => {
    console.log("participant", participant);
  }, []);

  const settings = useWttStore((state) => state.settings);

  const colorType = settings?.theme?.toString();


  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');

  const isRTL = settings?.language === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="wtt:bg-black wtt:rounded-md wtt:p-4 wtt:flex wtt:items-center wtt:cursor-pointer wtt:text-white wtt:relative"
      onClick={handleCardClick}
    >
      {/* Red vertical line on the right */}
      <div className={`${bgColor} wtt:absolute wtt:top-0 wtt:right-0 wtt:h-full wtt:w-0.25 wtt:rounded-tr-md wtt:rounded-br-md`}/>

      {/* Left: Image and WR */}
      <div className="wtt:flex wtt:flex-col wtt:items-center wtt:mr-4">
        <div className="wtt:w-20 wtt:h-20 wtt:rounded-full wtt:overflow-hidden wtt:bg-gray-700">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${participant.PlayerGivenName} ${participant.PlayerFamilyName}`}
              className="wtt:w-full wtt:h-full wtt:object-contain"
            />
          ) : (
            <span className="wtt:flex wtt:items-center wtt:justify-center wtt:h-full wtt:text-xl wtt:text-white">
              {participant.PlayerGivenName.charAt(0)}
              {participant.PlayerFamilyName.charAt(0)}
            </span>
          )}

        </div>
      </div>

      <div className="wtt:flex wtt:flex-col wtt:items-end wtt:ml-auto wtt:mt-auto">
        <div className="wtt:text-sm wtt:text-gray-400">WR</div>
        <div className="wtt:text-base wtt:font-semibold">#{participant.CurrentRanking}</div>
      </div>

      {/* Right: Name, Country, Points, Seed */}
      <div className="wtt:flex wtt:flex-col wtt:items-end wtt:ml-auto">
        <div className="wtt:text-sm wtt:font-bold">
          {participant.PlayerGivenName?.toUpperCase()} {participant.PlayerFamilyName?.toUpperCase()}
        </div>
        <div className="wtt:flex wtt:items-center wtt:mt-1">
          <img
            // src={`https://flagsapi.com/${participant.OrgCode}/flat/24.png`}
            src='/countryflag.png'
            alt={participant.OrgCode}
            // onError={(e) => {
            //   e.currentTarget.src = '/placeholder-flag.png';
            // }}
            className="wtt:w-6 wtt:h-4 wtt:mr-1"
          />
          <span className="wtt:text-xs wtt:text-gray-400">{participant.OrgCode}</span>
        </div>

        <div className="wtt:mt-3 wtt:text-sm wtt:text-gray-400">
          Points <span className="wtt:text-white wtt:font-medium">{participant.CurrentRankingPoints}</span>
        </div>
        <div className="wtt:mt-1 wtt:text-sm wtt:text-gray-400">
          Seed <span className="wtt:text-white wtt:font-medium">#{participant.Seed}</span>
        </div>
      </div>
    </div>
  );
};

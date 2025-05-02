import React from 'react';
import { Participant } from '../types';
import { useWttStore } from '../../utils/store';
import { getBgColorClass, getTextColorClass, getTextColorFontClass } from '../../layouts/components/helper';

interface DoublePlayerCardProps {
  player1: Participant;
  player2: Participant;
  photoUrl1?: string;
  photoUrl2?: string;
  teamName: string;
}

export const DoublePlayerCard: React.FC<DoublePlayerCardProps> = ({
  player1,
  player2,
  photoUrl1,
  photoUrl2,
  teamName,
}) => {
  const teamProfileUrl = `https://worldtabletennis.com/teamDescription?teamId=${teamName}`;

  const handleCardClick = () => {
    window.open(teamProfileUrl, '_blank');
  };

  const settings = useWttStore((state) => state.settings);

  const colorType = settings?.theme?.toString();


  const bgColor = getBgColorClass(colorType ?? '');
  const textColor = getTextColorClass(colorType ?? '');
  const textColorFontMedium = getTextColorFontClass(colorType ?? '');

  const isRTL = settings?.language === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="wtt:flex wtt:items-center wtt:bg-black wtt:rounded-md wtt:p-4 wtt:cursor-pointer wtt:relative wtt:overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Players block */}
      <div className="wtt:flex wtt:gap-8 wtt:flex-1">
        {/* Player 1 */}
        <div className="wtt:flex wtt:flex-col wtt:items-center wtt:text-center">
          <img
            src={photoUrl1}
            alt={`${player1.PlayerGivenName} ${player1.PlayerFamilyName}`}
            className="wtt:w-20 wtt:h-20 wtt:object-contain"
          />
          <div className="wtt:mt-2 wtt:text-white wtt:font-bold wtt:text-sm">
            {player1.PlayerGivenName}{" "}
            {/* <br /> */}
            {player1.PlayerFamilyName}
          </div>
          <div className="wtt:flex wtt:items-center wtt:mt-1">
            <img
              src='/countryflag.png'
              // src="/images/flag-placeholder.svg"
              alt={player1.OrgCode}
              className="wtt:w-6 wtt:h-4 wtt:mr-1"
            />
            <span className="wtt:text-xs wtt:text-white">{player1.OrgCode}</span>
          </div>
        </div>

        {/* Player 2 */}
        <div className="wtt:flex wtt:flex-col wtt:items-center wtt:text-center">
          <img
            src={photoUrl2}
            alt={`${player2.PlayerGivenName} ${player2.PlayerFamilyName}`}
            className="wtt:w-20 wtt:h-20 wtt:object-contain"
          />
          <div className="wtt:mt-2 wtt:text-white wtt:font-bold wtt:text-sm">
            {player2.PlayerGivenName}{" "}
            {/* <br /> */}
            {player2.PlayerFamilyName}
          </div>
          <div className="wtt:flex wtt:items-center wtt:mt-1">
            <img
              // src="/images/flag-placeholder.svg"
              src='/countryflag.png'
              alt={player2.OrgCode}
              className="wtt:w-6 wtt:h-4 wtt:mr-1"
            />
            <span className="wtt:text-xs wtt:text-white">{player2.OrgCode}</span>
          </div>
        </div>
      </div>

      {/* CPR & Seed */}
      <div className="wtt:flex wtt:flex-col wtt:items-end wtt:justify-center wtt:text-right wtt:pr-3">
        <div className="wtt:text-xs wtt:text-gray-400">CPR</div>
        <div className="wtt:text-white wtt:text-base wtt:font-medium">
          {player1.CurrentRanking || '-'}
        </div>
        <div className="wtt:mt-2 wtt:text-xs wtt:text-gray-400">Seed</div>
        <div className="wtt:text-white wtt:text-base wtt:font-medium">
          #{player1.Seed || '-'}
        </div>
      </div>

      {/* Red vertical line */}
      <div className={`${bgColor} wtt:absolute wtt:top-0 wtt:right-0 wtt:h-full wtt:w-0.25`} />
    </div>
  );
};

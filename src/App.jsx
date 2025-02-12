import React from 'react';
import { ArrowUp, ArrowDown, Minus, Globe, Calendar, Users } from 'lucide-react';
import cover from './assets/cover.webp';
import stream from './assets/spotify_stream.json';

const App = () => {
  const data = stream;

  // Sort the data by streams in descending order
  const sortedData = data.sort((a, b) => b.streams - a.streams);

  const getRankChange = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return <ArrowUp className="text-green-500 animate-bounce" size={16} />;
    } else if (diff < 0) {
      return <ArrowDown className="text-red-500 animate-bounce" size={16} />;
    }
    return <Minus className="text-gray-500" size={16} />;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const StatCard = ({ icon: Icon, title, value, className }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 text-black">
      <div className={`p-3 rounded-full ${className}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-black">{value}</p>
      </div>
    </div>
  );

  const totalStreams = sortedData.reduce((acc, curr) => acc + curr.streams, 0);
  const averageStreams = Math.round(totalStreams / sortedData.length);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">
            Spotify Daily Top Streams
          </h1>
          <div className="text-sm text-gray-600">
            Last updated: {"2/11/2025"}
          </div>
        </div>

        <div className="card bg-white rounded-xl shadow-lg overflow-hidden flex">
          <div className="cover-img p-6">
            <img src={cover} alt="" />
          </div>
          <div className="track-info">
            <div>
              <p className="title-name font-semibold text-black">Born Again</p>
              <p className="artist-name text-gray-600">LISA feat. Doja Cat & Raye</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={Globe}
            title="Total Countries"
            value={sortedData.length - 1}
            className="bg-blue-500"
          />
          <StatCard
            icon={Calendar}
            title="Total days on chart"
            value={"5"}
            className="bg-green-500"
          />

        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Detailed Rankings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Country</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Current Rank</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Streams</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Stream Change</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row) => (
                    <tr
                      key={row.country}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-800">{row.country}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getRankChange(row.currentRank, row.previousRank)}
                          <span className="font-semibold text-gray-800">{row.currentRank}</span>

                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-800">{formatNumber(row.streams)}</td>
                      <td className={`p-4 font-medium ${row.streamChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.streamChange > 0 ? '+' : ''}{formatNumber(row.streamChange)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-5 justify-center">
        <p className=' mr-1'>Data from </p>
        <a  className='mr-1 text-green-600'href="https://charts.spotify.com/charts/overview/global">Spotify</a>
      </div>

    </div>
  );
};

export default App;

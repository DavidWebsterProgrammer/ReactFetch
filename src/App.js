import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchApp />
    </QueryClientProvider>
  );
}

function FetchApp() {
  // Dog Query
  const { data: dogData, refetch: refetchDog, isLoading: loadingDog } = useQuery({
    queryKey: ['dog'],
    queryFn: async () => (await fetch('https://dog.ceo/api/breeds/image/random')).json(),
    enabled: false,
  });

  // Joke Query
  const { data: jokeData, refetch: refetchJoke, isLoading: loadingJoke } = useQuery({
    queryKey: ['joke'],
    queryFn: async () => (await fetch('https://official-joke-api.appspot.com/random_joke')).json(),
    enabled: false,
  });

  // User Query
  const { data: userData, refetch: refetchUser, isLoading: loadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await fetch('https://randomuser.me/api/')).json(),
    enabled: false,
  });

  return (
    <div className="app-container">
      <h1>Random Fetch App</h1>
      
      {/* Buttons Section */}
      <div className="button-container">
        <button className="dog-button" onClick={refetchDog}>
          Get Dog
        </button>
        <button className="joke-button" onClick={refetchJoke}>
          Get Joke
        </button>
        <button className="user-button" onClick={refetchUser}>
          Get User
        </button>
      </div>

      {/* Results Section */}
      <div className="results-container">
        {/* Dog Section */}
        <div className="card">
          <h2>Random Dog Image</h2>
          {loadingDog ? (
            <p className="loading">Loading...</p>
          ) : (
            dogData?.message && <img src={dogData.message} alt="Random Dog" />
          )}
        </div>

        {/* Joke Section */}
        <div className="card">
          <h2>Random Joke</h2>
          {loadingJoke ? (
            <p className="loading">Loading...</p>
          ) : (
            jokeData && (
              <div>
                <p>{jokeData.setup}</p>
                <p className="italic">{jokeData.punchline}</p>
              </div>
            )
          )}
        </div>

        {/* User Section */}
        <div className="card user-card">
          <h2>Random User</h2>
          {loadingUser ? (
            <p className="loading">Loading...</p>
          ) : (
            userData?.results?.[0] && (
              <div>
                <img
                  src={userData.results[0].picture.large}
                  alt="Random User"
                />
                <p>
                  {userData.results[0].name.first} {userData.results[0].name.last}
                </p>
                <p>{userData.results[0].email}</p>
                <p>
                  {userData.results[0].location.city}, {userData.results[0].location.country}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
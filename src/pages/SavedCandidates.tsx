import { useEffect } from 'react';
import CandidateCard from '../components/candidateCard';
import { Candidate } from '../interfaces/Candidate.interface';

const storedCandidates = JSON.parse(
  localStorage.getItem('savedCandidates') || '[]'
);

const SavedCandidates = () => {
  useEffect(() => {
    const candidates = JSON.parse(
      localStorage.getItem('savedCandidates') || '[]'
    );
    if (candidates.length === 0) {
      alert('No candidates saved yet!');
    }
  }
  , []);
  return (
    <>
      <h1>Potential Candidates</h1>
      <div className="flex flex-col items-center justify-center">
        {storedCandidates.map((candidate: Candidate) => (
          <div className="flex flex-col items-center justify-center">
          <CandidateCard
            key={candidate.id}
            id={candidate.id}
            login={candidate.login}
            avatar_url={candidate.avatar_url}
            node_id={candidate.node_id}
          />

          
          <button
            className="btn btn-danger"
            onClick={() => {
              const updatedCandidates = storedCandidates.filter(
                (c: Candidate) => c.id !== candidate.id
              );
              localStorage.setItem(
                'savedCandidates',
                JSON.stringify(updatedCandidates)
              );
              window.location.reload();
            }}
          >
            Remove Candidate
          </button>
          </div>
          
        ))}
      </div>
    </>
  );
};

export default SavedCandidates;

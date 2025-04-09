import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import candidtateCard from '../components/candidateCard';

console.log(import.meta.env.VITE_GITHUB_TOKEN);

interface Candidate {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
}



const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);


  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data: Candidate[] = await searchGithub();
      setCandidates(data);
      setLoading(false);
    };

    
    fetchCandidates();
    setCandidateIndex(0);
  }, []);

  const handleAccept = (candidate: Candidate) => {
    // Handle accepting a candidate
    // save candidate to local storage
    const savedCandidates = JSON.parse(
      localStorage.getItem('savedCandidates') || '[]'
    );
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    console.log('Accepted:', candidate);
  };
  const handleReject = (candidate: Candidate) => {
    // Handle rejecting a candidate
    console.log('Rejected:', candidate);
  };
  
  // set up an on click event for the accept and reject buttons
  const handleClick = (candidate: Candidate, action: string) => {
    setCandidateIndex((prevIndex) => prevIndex + 1);
    if (action === 'accept') {
      handleAccept(candidate);
    } else if (action === 'reject') {
      handleReject(candidate);
    }
  };

  const candidateArray = candidates.map((candidate) => {
    return {
      id: candidate.id,
      login: candidate.login,
      node_id: candidate.node_id,
      avatar_url: candidate.avatar_url,
    };
  });
  
  console.log('Candidate Array:', candidateArray);

  // Create a function to render one candidate card at a time based on the index of the candidate array
  const renderCandidateCard = (index: number) => {
    if (index < candidateArray.length) {
      const candidate = candidateArray[index];
      // return a candidate card component with the candidate data
      return (
        <div className="col-md-4" key={candidate.id}>
          {candidtateCard(candidate)}
          <div className="card-body">
            <button
              className="btn btn-success"
              onClick={() => handleClick(candidate, 'accept')}
            >
              Accept
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleClick(candidate, 'reject')}
            >
              Reject
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-md-4" key={index}>
          <h2>No more candidates</h2>
        </div>
      );
    }
  };
  

  
  return (
  
    <div className="container">
      <div className="row">
        {/* Render candidate cards here, displaying one, then on acceptance or rejection, displaying the next, one after the other. */}
        {loading ? (
          <div className="text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          <div className="row">
            {renderCandidateCard(candidateIndex)}
          </div>
          )}
        

        
        
      </div>
    </div>


  );
  
};

export default CandidateSearch;

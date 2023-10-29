import React from 'react';

function MembersList({ members }) {
  return (
    <div className="members-list">
      <h3>Členové seznamu:</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

export default MembersList;
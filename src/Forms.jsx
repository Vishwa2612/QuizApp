import { db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Forms = () => {
  const [formData, setFormData] = useState(null);
  const [link, setLink] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formsCollection = collection(db, 'forms');
        const q = query(formsCollection, where('link', '==', link));
        const querySnapshot = await getDocs(q);
        console.log("Link",link);
        console.log('Query Snapshot:', querySnapshot.docs);
        if (querySnapshot.docs.length === 0) {
          console.log('No matching documents.');
          return;
        }
        const formDocument = querySnapshot.docs[0].data();
        console.log('Form Document:', formDocument);
        setFormData(formDocument);
      } catch (error) {
        console.error('Error retrieving document: ', error);
      }
    };
    fetchData();
  }, [link]);
   
  return (
    <div>
      <h2>Form Details:</h2>
      {formData ? (
        <div>
          <h3>Link: {formData.link}</h3>
          <h3>Questions:</h3>
          <ul>
            {formData.questions.map((question, index) => (
              <li key={index}>
                <strong>{question.text}</strong>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Forms;



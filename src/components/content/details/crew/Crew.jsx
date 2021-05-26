import React from 'react';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../../services/apiService/movies.service';
import NoImageFound from '../../../../assets/No-image-found.jpg';

import './Crew.scss';
import { motion } from 'framer-motion';

const Crew = () => {
  const { movieCast } = useSelector((state) => state.movies);
  console.log(movieCast);
  return (
    <>
      <div className="cast">
        <div className="div-title">Crew</div>
        <motion.table
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.2, delay: 0.04 }
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className="head">Department</th>
              <th className="head">Job</th>
            </tr>
          </thead>
          <tbody>
            {movieCast.crew.slice(0, 5).map((member, id) => (
              <tr key={id}>
                <td>
                  <img
                    style={{ minHeight: 80 }}
                    src={
                      member.profile_path !== null
                        ? `${IMAGE_URL}${member.profile_path}`
                        : NoImageFound
                    }
                    alt="crew member"
                  />
                </td>
                <td>{member.original_name}</td>
                <td>{member.department}</td>
                <td>{member.known_for_department}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </>
  );
};

export default Crew;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguages,
  translateQuery,
} from "../redux/actions/translateActions";
import Select from "react-select";
import { clearAnswerQuerry } from "../redux/slices/translateSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const [query, setQuery] = useState("");
  const [currentLang, setCurrentLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    dispatch(translateQuery({ targetLang, currentLang, query }));
  }, [query, targetLang, currentLang]);

  const handleChange = () => {
    setTargetLang(currentLang);
    setCurrentLang(targetLang);
    if (query) {
      setQuery(state.answerText);
    } else {
      setQuery("");
      dispatch(clearAnswerQuerry());
    }
  };

  const handleTranslate = () => {
    dispatch(translateQuery({ targetLang, currentLang, query }));
  };
  const handleReset = () => {
    setQuery("");
    dispatch(clearAnswerQuerry());
    setCurrentLang({
      label: "Turkish",
      value: "tr",
    });
    setTargetLang({
      label: "English",
      value: "en",
    });
  };

  console.log(state.answerText);
  return (
    <div className="container">
      <div className="head">
        <img
          onClick={handleReset}
          src="/image/icon.gif"
          alt=""
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
        <h1>
          Translate<span>+</span>
        </h1>
      </div>

      <div className="wrapper">
        <div className="text-input">
          <textarea
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="from-text"
            placeholder="Enter text"
          ></textarea>
          <textarea
            value={state.answerText}
            disabled
            className="to-text"
            placeholder="Translation"
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i id="from" className="fas fa-volume-up"></i>
              <i id="from" className="fas fa-copy"></i>
            </div>
            <Select
              className="select-title"
              value={currentLang}
              onChange={(e) => setCurrentLang(e)}
              options={state.languages}
              isDisabled={state.isLoading}
              isLoading={state.isLoading}
            />
          </li>
          <li className="exchange">
            <i onClick={handleChange} className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <Select
              className="select-title"
              value={targetLang}
              onChange={(e) => setTargetLang(e)}
              options={state.languages}
              isDisabled={state.isLoading}
              isLoading={state.isLoading}
            />
            <div className="icons">
              <i id="to" className="fas fa-volume-up"></i>
              <i id="to" className="fas fa-copy"></i>
            </div>
          </li>
        </ul>

        <button onClick={handleTranslate}>Translate Text</button>
      </div>
    </div>
  );
};

export default MainPage;

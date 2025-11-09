import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import type { ResearchFormProps } from '../types/research';
import './ResearchForm.css';

/**
 * ResearchForm component for submitting research topics
 * Handles user input validation and form submission
 */
export const ResearchForm = ({ onSubmit, isLoading, disabled }: ResearchFormProps) => {
    const [topic, setTopic] = useState('');
    const [isValid, setIsValid] = useState(false);

    // Validate topic input
    const validateTopic = useCallback((value: string) => {
        const trimmedValue = value.trim();
        const isValidTopic = trimmedValue.length > 0 && trimmedValue.length <= 500;
        setIsValid(isValidTopic);
        return isValidTopic;
    }, []);

    // Handle input change
    const handleTopicChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTopic(value);
        validateTopic(value);
    }, [validateTopic]);

    // Handle form submission
    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedTopic = topic.trim();
        if (trimmedTopic && isValid && !isLoading && !disabled) {
            onSubmit(trimmedTopic);
        }
    }, [topic, isValid, isLoading, disabled, onSubmit]);

    // Determine if submit button should be disabled
    const isSubmitDisabled = !isValid || isLoading || disabled || !topic.trim();

    return (
        <div className="research-form">
            <form onSubmit={handleSubmit} className="research-form__form">
                <div className="research-form__input-group">
                    <label htmlFor="research-topic" className="research-form__label">
                        Research Topic
                    </label>
                    <input
                        id="research-topic"
                        type="text"
                        value={topic}
                        onChange={handleTopicChange}
                        placeholder="Enter a topic to research (e.g., AI Agents, Machine Learning, etc.)"
                        className={`research-form__input ${!isValid && topic ? 'research-form__input--invalid' : ''}`}
                        disabled={isLoading || disabled}
                        maxLength={500}
                        autoComplete="off"
                        aria-describedby="topic-help topic-error"
                    />
                    <div id="topic-help" className="research-form__help">
                        Enter a research topic to get started. Maximum 500 characters.
                    </div>
                    {!isValid && topic && (
                        <div id="topic-error" className="research-form__error" role="alert">
                            Please enter a valid research topic (1-500 characters).
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`research-form__submit ${isSubmitDisabled ? 'research-form__submit--disabled' : ''}`}
                    aria-describedby="submit-help"
                >
                    {isLoading ? (
                        <>
                            <span className="research-form__spinner" aria-hidden="true">⏳</span>
                            Submitting...
                        </>
                    ) : (
                        'Start Research'
                    )}
                </button>

                <div id="submit-help" className="research-form__submit-help">
                    {isSubmitDisabled && !isLoading && topic && (
                        'Please enter a valid topic to start research'
                    )}
                </div>
            </form>
        </div>
    );
};
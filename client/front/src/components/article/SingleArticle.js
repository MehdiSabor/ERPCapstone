import React, { useEffect } from 'react';
import { useSidebar } from '../../SidebarContext';
import { useFetchArticleById } from '../../hooks/articleHooks';

const SingleArticle = ({ articleId, onChangeView }) => {
    const { article, loading, error } = useFetchArticleById(articleId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        const articleButtons = [
            <button key="update" onClick={() => onChangeView('update', articleId)}>Update Article</button>,
            <button key="delete" onClick={() => onChangeView('delete', articleId)}>Delete Article</button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2),  // Keep the first two base buttons
            ...articleButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons, onChangeView, articleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>No article found</p>;

    const formatValue = (key, value) => {
        if (key === 'bloquer') return value ? 'Yes' : 'No';
        if (key === 'createdAt') return new Date(value).toLocaleDateString();
        return value;
    };

    return (
        <div>
            <h3>Article Details</h3>
            <ul>
                {Object.entries(article).map(([key, value]) => (
                    !['devis', 'bonliv', 'facture', 'avoirs', 'reglements', 'UnifiedFactureAvoir', 'comercial'].includes(key) && (
                        <li key={key}>{`${key}: ${formatValue(key, value)}`}</li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default SingleArticle;

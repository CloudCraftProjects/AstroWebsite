import {useEffect, useState} from "preact/hooks";
import type {FunctionComponent} from "preact/compat";

interface Props {
    url: string;
    visibleThreshold?: number;
    visibleElement?: string;
}

const PlayerCounter: FunctionComponent<Props> = ({url, visibleThreshold = 10, visibleElement}) => {
    const [playerCount, setPlayerCount] = useState<number | null>(null);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => {
                const count = json.players.online as number;
                setPlayerCount(count);
                if (count >= visibleThreshold && visibleElement) {
                    const el = document.querySelector(visibleElement);
                    if (el) {
                        (el as HTMLElement).style.opacity = "100%";
                    }
                }
            })
            .catch(console.error);
    }, [url, visibleThreshold, visibleElement]);

    return <span>{playerCount !== null ? playerCount : "??"}</span>;
};
export default PlayerCounter;

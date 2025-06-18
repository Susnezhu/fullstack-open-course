# Kaaviot tehtäviin: 0.4; 0.5; 06

Päätin lisätä kaikki kaaviot samaan tidostoon

# Käyttäjä avaa sivuston

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain as Selain (selain)
    participant Palvelin as Palvelin (server)

    Käyttäjä->>Selain: avaa sivuston

    Selain->>Palvelin: pyytää html, css ja js tiedostot
    Palvelin->>Selain: lähettää tiedostot
    Selain->>Käyttäjä: näyttää sivuston käyttäjälle
```

# Uuden muistiinpanon luominen

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain as Selain (selain)
    participant Palvelin as Palvelin (server)

    Käyttäjä->>Selain: kirjoittaa tekstin ja painaa "Send"

    Selain->>Palvelin: lähettää tiedot palvelimelle (POST /new_note)
    activate Palvelin
    %% Palvelin lisää tiedot muistiinpanoihin
    Palvelin-->>Selain: lähettää uuden html (200 OK)
    deactivate Palvelin

    Selain->>Käyttäjä: näyttää uusi muistiinpano
```


# Uuden muistiinpanon luominen (SPA vesio)

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain as Selain (selain)
    participant Palvelin as Palvelin (API)

    Käyttäjä->>Selain: kirjoittaa tekstin ja painaa "Send"

    Selain->>Palvelin: lähettää tiedot palvelimelle (POST /api/notes)
    activate Palvelin
    %% Palvelin lisää tiedot muistiinpanoihin
    Palvelin-->>Selain: palauttaa JSON-vastaus: {"message":"note created"} (201 Created)
    deactivate Palvelin

    Selain->>Käyttäjä: päivittää näkymän ja lisää uusi muistiinpano DOMiin
```
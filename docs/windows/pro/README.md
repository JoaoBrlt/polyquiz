# PolyQuiz: Windows Pro

## Requirements

1. Download the latest [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) release.
   
2. Download [this repository](https://github.com/JoaoBrlt/polyquiz).

3. Install Docker Desktop for Windows.

4. Keep the default configuration during the installation.

5. Reboot your computer.

## Run

1. Open Docker Desktop for Windows.
   
2. When Docker Desktop is ready, you will receive a notification.

3. Open Windows PowerShell.

4. Navigate to the root of this repository on your computer.

```bash
cd .\Documents\polyquiz
```

5. Run this command to convert `\r\n` into `\n`.

```bash
dos2unix server/entrypoint.sh
```

6. Build and run the project.

```bash
docker-compose up --build
```

7. When you are asked to share the access to the `C:\.` drive, press the `Share it` button.

8. Wait for Docker to do your job (~5min).

9. Enjoy the website at `http://localhost:4200`.

## Stop

1. Press `Control+C` to stop all containers.

2. Wait for Docker to stop all containers.

3. Remove all the containers.

```bash
docker-compose down
```

# PolyQuiz: Windows Home

## Requirements

1. Download the latest [Virtualbox](https://www.virtualbox.org/wiki/Downloads) release (6.0.0+).

2. Download the latest [Docker Toobox](https://github.com/docker/toolbox/releases) release (19.0.0+).

3. Download [this repository](https://github.com/JoaoBrlt/polyquiz).

4. Install `Virtualbox`. 

5. Install `Docker Toobox`.

6. Disable `Virtualbox` during the installation of `Docker Toobox`.

7. Open `Docker Quickstart Terminal`.

8. Wait for `Docker Toolbox` to install all dependencies.

9. Close `Docker Quickstart Terminal`.

10. Open `Virtualbox`, and configure the virtual machine called `default`. 

11. Navigate to `Network` > `Advanced`, and select `Port forwarding`.

12. Add two port forwarding rules.

```
Name: client
Protocol: TCP
Host IP: 127.0.0.1
Host Port: 4200
Guest Port: 4200
```
```
Name: server
Protocol: TCP
Host IP: 127.0.0.1
Host Port: 3000
Guest Port: 3000
```
13. *(Optional but recommended)* Allocate more memory.

14. *(Optional but recommended)* Allocate more CPU cores.


## Run

1. Re-open `Docker Quickstart Terminal`.

2. Navigate to the root of this repository on your computer.

```bash
cd ~/Documents/polyquiz
```

3. Enable the conversion from Windows paths to Unix paths.

```
export COMPOSE_CONVERT_WINDOWS_PATHS=1
```

4. Run this command to convert `\r\n` into `\n`.

```bash
dos2unix server/entrypoint.sh
```

5. Build and run the project.

```bash
docker-compose up --build
```

NB: If docker fails, restart the terminal and rerun the command.

6. Wait for `Docker Toolbox` to do your job (~10min).

7. Enjoy the website at `http://localhost:4200`.

## Stop

1. Press `Control+C` to stop all containers.

2. Wait for `Docker Toolbox` to stop all containers.

3. Remove all the containers.

```bash
docker-compose down
```

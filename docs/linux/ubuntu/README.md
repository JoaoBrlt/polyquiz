# PolyQuiz: Ubuntu

## Requirements

1. Download [this repository](https://github.com/JoaoBrlt/polyquiz).
   
2. Install Docker Engine.
```bash
# Update the apt package list.
sudo apt-get update

# Install Docker's package dependencies.
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# Download and add Docker's official public PGP key.
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Verify the fingerprint.
sudo apt-key fingerprint 0EBFCD88

# Add the `stable` channel's Docker upstream repository.
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Update the apt package list.
sudo apt-get update

# Install Docker CLI.
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add the docker group to the user.
sudo usermod -aG docker $USER
```

3. Install Docker Compose.

```bash
# Download the current stable release.
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to the binary
sudo chmod +x /usr/local/bin/docker-compose
```

## Run

1. Start `Docker Engine`.

```bash
sudo systemctl start docker
```

2. Navigate to the root of this repository on your computer.

```bash
cd ~/Documents/polyquiz
```

3. Build and run the project with `Docker Compose`.

```bash
docker-compose up --build
```

4. Wait for `Docker` to do your job (~5min).
   
5. Enjoy the application at `http://localhost:4200`.

## Stop

1. Press `Control+C` to stop all containers.
   
2. Wait for `Docker` to stop all containers.
   
3. Remove all the containers.

```bash
docker-compose down
```

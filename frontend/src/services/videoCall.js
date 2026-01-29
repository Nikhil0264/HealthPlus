class Call {
  constructor() {
    this.createPeer();
  }

  createPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
  }

  addLocalStream(stream) {
    if (this.peer.signalingState === "closed") {
      this.createPeer();
    }

    stream.getTracks().forEach((track) => {
      this.peer.addTrack(track, stream);
    });
  }

  onRemoteStream(callback) {
    this.peer.ontrack = (e) => callback(e.streams[0]);
  }

  onIceCandidate(callback) {
    this.peer.onicecandidate = (e) => {
      if (e.candidate) callback(e.candidate);
    };
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer) {
    await this.peer.setRemoteDescription(offer);
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteAnswer(answer) {
    await this.peer.setRemoteDescription(answer);
  }

  async addIceCandidate(candidate) {
    await this.peer.addIceCandidate(candidate);
  }

  close() {
    this.peer?.close();
  }
}

export default new Call();

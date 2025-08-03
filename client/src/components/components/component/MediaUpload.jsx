import React, { useState, useRef } from 'react';
import { X, Upload, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Video Preview Component
const VideoPreview = ({ media, onRemove }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      className="relative flex-shrink-0 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-secondary bg-primary shadow-sm relative">
        <video
          ref={videoRef}
          src={media.url}
          className="w-full h-full object-cover"
          muted={isMuted}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        />
        
        {/* Video Controls Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-gray-800" />
            ) : (
              <Play className="w-4 h-4 text-gray-800 ml-0.5" />
            )}
          </button>
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`absolute bottom-1 right-1 w-5 h-5 bg-black bg-opacity-60 hover:bg-opacity-80 rounded text-white flex items-center justify-center transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          {isMuted ? (
            <VolumeX className="w-3 h-3" />
          ) : (
            <Volume2 className="w-3 h-3" />
          )}
        </button>

        {/* Video indicator */}
        {/* <div className="absolute top-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
          VIDEO
        </div> */}
      </div>
      
      {/* Remove button */}
      <button
        onClick={() => onRemove(media.id)}
        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-sm z-10"
      >
        <X className="w-3 h-3" />
      </button>
      
      {/* File name tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 rounded-b-lg truncate opacity-0 group-hover:opacity-100 transition-opacity">
        {media.name}
      </div>
    </div>
  );
};

// Image Preview Component
const ImagePreview = ({ media, onRemove }) => {
  return (
    <div className="relative flex-shrink-0 items-center justify-center group">
      <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 bg-white shadow-sm">
        <img
          src={media.url}
          alt={media.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Remove button */}
      <button
        onClick={() => onRemove(media.id)}
        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-sm z-50"
      >
        <X className="w-3 h-3" />
      </button>
      
      {/* File name tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 rounded-b-lg truncate opacity-0 group-hover:opacity-100 transition-opacity">
        {media.name}
      </div>
    </div>
  );
};

const MediaUpload = ({ className = "" }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMedia = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        };
        setMediaFiles(prev => [...prev, newMedia]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeMedia = (id) => {
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  return (
    <div className={`${className}`}>
      {/* Combined Upload Area and Media Previews with Horizontal Scroll */}
      <div className="w-full">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Media Previews */}
          {mediaFiles.map((media) => {
            if (media.type === 'video') {
              return <VideoPreview key={media.id} media={media} onRemove={removeMedia} />;
            } else {
              return <ImagePreview key={media.id} media={media} onRemove={removeMedia} />;
            }
          })}
          
          {/* Upload Area - always positioned to the right */}
          <div className="w-24 h-24 relative flex-shrink-0">
            {/* Custom dotted border using SVG */}
            <div 
              className={`w-full h-full relative cursor-pointer transition-colors rounded-xl ${isDragging ? 'bg-blue-50' : 'hover:bg-primary-mutedee'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ borderRadius: '12px' }}
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="calc(100% - 1px)"
                  height="calc(100% - 1px)"
                  fill="none"
                  stroke={isDragging ? "#3b82f6" : "#fff"}
                  strokeWidth="1"
                  strokeDasharray="6 5"
                  rx="12"
                  ry="12"
                />
              </svg>
              
              <div className="w-9 h-9 left-[27px] top-[27px] absolute overflow-hidden flex items-center justify-center">
                <img src="/svg/Media.svg" alt="" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;